import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const walletAddress = searchParams.get('walletAddress');

        if (!walletAddress) {
            return NextResponse.json({ error: 'walletAddress is required' }, { status: 400 });
        }

        // Generate a random nonce
        const nonce = crypto.randomBytes(32).toString('hex');
        const message = `Sign this message to authenticate with Superteam Academy: ${nonce}`;

        // Upsert user with new nonce
        const { error } = await supabase
            .from('users')
            .upsert(
                {
                    wallet_address: walletAddress,
                    nonce: message,
                    updated_at: new Date().toISOString()
                },
                { onConflict: 'wallet_address' }
            );

        if (error) {
            console.error('Supabase error:', error);
            // If table doesn't exist, we might get an error.
            // But we'll assume the user will run the schema.
            return NextResponse.json({ error: 'Failed to generate nonce' }, { status: 500 });
        }

        return NextResponse.json({ nonce: message });
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
