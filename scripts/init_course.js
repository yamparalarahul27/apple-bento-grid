
const anchor = require("@coral-xyz/anchor");
const { Connection, Keypair, PublicKey } = require("@solana/web3.js");
const fs = require("fs");
const path = require("path");
const idl = require("../src/lib/idl/onchain_academy.json");

// Environment setup
const CLUSTER_URL = "https://api.devnet.solana.com";
const KEYPAIR_PATH = path.resolve(__dirname, "../../superteam-academy/wallets/signer.json");
const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID || "8iSxN2Va5bJJzJDRsenGM3JVyuXtG8vwp5tZcYZ7cXAR");

async function main() {
    console.log("Starting initialization...");

    // 1. Setup Connection and Provider
    const connection = new Connection(CLUSTER_URL, "confirmed");

    if (!fs.existsSync(KEYPAIR_PATH)) {
        throw new Error(`Keypair not found at ${KEYPAIR_PATH}`);
    }
    const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync(KEYPAIR_PATH, "utf-8")));
    const wallet = new anchor.Wallet(Keypair.fromSecretKey(secretKey));

    const provider = new anchor.AnchorProvider(connection, wallet, {
        commitment: "confirmed",
    });
    anchor.setProvider(provider);

    const program = new anchor.Program(idl, provider);

    console.log(`Wallet: ${wallet.publicKey.toBase58()}`);
    console.log(`Program: ${PROGRAM_ID.toBase58()}`);

    // 2. Initialize Program Config (if needed)
    const [configPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("config")],
        program.programId
    );

    try {
        const configAccount = await program.account.config.fetch(configPda);
        console.log("Config already exists:", configAccount);
    } catch (e) {
        console.log("Config not found. Initializing...");

        // Need a fresh keypair for xp_mint since initialize expects it as a signer to create it
        const mintKeypair = Keypair.generate();
        console.log(`New XP Mint: ${mintKeypair.publicKey.toBase58()}`);

        const tx = await program.methods
            .initialize()
            .accounts({
                xpMint: mintKeypair.publicKey,
            })
            .signers([mintKeypair])
            .rpc();

        console.log("Initialized program. Tx:", tx);
    }

    // 3. Create Course "solana-fundamentals"
    const courseId = "solana-fundamentals";
    const [coursePda] = PublicKey.findProgramAddressSync(
        [Buffer.from("course"), Buffer.from(courseId)],
        program.programId
    );

    try {
        const courseAccount = await program.account.course.fetch(coursePda);
        console.log("Course found:", courseAccount);
    } catch (e) {
        console.log(`Course '${courseId}' not found. Creating...`);

        const params = {
            courseId: courseId,
            creator: wallet.publicKey,
            contentTxId: new Array(32).fill(0), // Dummy content hash
            lessonCount: 6, // Matching frontend mock
            difficulty: 1, // Beginner
            xpPerLesson: 100,
            trackId: 1,
            trackLevel: 1,
            prerequisite: null,
            creatorRewardXp: 0,
            minCompletionsForReward: 0,
        };

        const tx = await program.methods
            .createCourse(params)
            .accounts({
                // course PDA is auto-derived by Anchor based on seeds
            })
            .rpc();

        console.log(`Course '${courseId}' created. Tx: ${tx}`);
    }

    console.log("Done!");
}

main().catch(err => {
    console.error("Error:", err);
    process.exit(1);
});
