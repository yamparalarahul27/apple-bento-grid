import { Keypair } from "@solana/web3.js";
import fs from "fs";

/**
 * Loads the backend keypair from the environment variable or file.
 * This keypair is the "Teacher" authority that co-signs lesson completions.
 */
export function getBackendKeypair(): Keypair {
    const keypairPath = process.env.BACKEND_SIGNER_KEYPAIR;

    if (!keypairPath) {
        throw new Error("BACKEND_SIGNER_KEYPAIR environment variable not set");
    }

    try {
        const keypairString = fs.readFileSync(keypairPath, "utf-8");
        const keypairBuffer = JSON.parse(keypairString);
        return Keypair.fromSecretKey(Uint8Array.from(keypairBuffer));
    } catch (error) {
        console.error("Failed to load backend keypair:", error);
        throw new Error("Failed to load backend keypair");
    }
}
