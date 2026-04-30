import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('Missing required environment variable: JWT_SECRET');
}

export async function POST(req: NextRequest) {
    try {
        const { walletAddress, signature, message } = await req.json();

        if (!walletAddress || !signature || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Fetch user to verify nonce
        const { data: user, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('wallet_address', walletAddress)
            .single();

        if (fetchError || !user) {
            return NextResponse.json({ error: 'User not found or nonce expired' }, { status: 404 });
        }

        // 2. The message must match what we stored
        if (user.nonce !== message) {
            return NextResponse.json({ error: 'Invalid nonce' }, { status: 400 });
        }

        // 3. Verify signature
        // The signature is usually base64 or hex from the frontend
        // Public key is decoded from base58
        const signatureUint8 = signature instanceof Uint8Array ? signature : Buffer.from(signature, 'base64');
        const messageUint8 = new TextEncoder().encode(message);
        const pubKeyUint8 = bs58.decode(walletAddress);

        const isValid = nacl.sign.detached.verify(
            messageUint8,
            signatureUint8,
            pubKeyUint8
        );

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        // 4. Create JWT
        const token = jwt.sign(
            {
                sub: user.id,
                walletAddress: user.wallet_address,
                role: 'learner'
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // 5. Clear nonce after successful login
        await supabase
            .from('users')
            .update({ nonce: null })
            .eq('id', user.id);

        return NextResponse.json({
            token,
            user: {
                id: user.id,
                walletAddress: user.wallet_address,
                displayName: user.display_name
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
