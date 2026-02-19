import { NextRequest, NextResponse } from "next/server";
import { Keypair, Transaction, PublicKey } from "@solana/web3.js";
import { getBackendKeypair } from "@/lib/server-utils";
import jwt from "jsonwebtoken";

// Prevent this route from being statically cached
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { serializedTx } = body;
        const authHeader = req.headers.get('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: "Missing or invalid authorization" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        let decoded: string | jwt.JwtPayload;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET || 'REMOVED_SECRET');
            console.log(`Authenticated request from user: ${typeof decoded === 'string' ? decoded : decoded.sub}`);
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        if (!serializedTx) {
            return NextResponse.json(
                { error: "Missing serialized transaction" },
                { status: 400 }
            );
        }

        // 1. Load the Backend Signer (Teacher)
        let backendKeypair: Keypair;
        try {
            backendKeypair = getBackendKeypair();
        } catch (error) {
            console.error("Backend keypair error:", error);
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        // 2. Deserialize the transaction
        const tx = Transaction.from(Buffer.from(serializedTx, "base64"));

        // 3. TODO: Verify the transaction contents here
        // (Check that it's a valid complete_lesson instruction for the correct user)

        // 4. Sign the transaction
        tx.partialSign(backendKeypair);

        // 5. Serialize and return
        const signedTx = tx.serialize({ requireAllSignatures: false });

        return NextResponse.json({
            signedTx: signedTx.toString("base64"),
        });

    } catch (error) {
        console.error("Signing error:", error);
        return NextResponse.json(
            { error: "Failed to sign transaction" },
            { status: 500 }
        );
    }
}
