import {
    Connection,
    PublicKey,
    TransactionSignature,
    SystemProgram,
    Transaction
} from "@solana/web3.js";
import { Program, AnchorProvider, Idl } from "@coral-xyz/anchor";
import { CourseProgress, LearningProgressService } from "./learning-progress.service";
import idl from "@/lib/idl/onchain_academy.json";

// Top-level constants should be avoided if they use environment variables that might be missing during build
// Move them inside the service or use safe defaults

export class OnChainLearningProgressService implements LearningProgressService {
    private connection: Connection;
    private provider: AnchorProvider;
    private program: Program;

    constructor(connection: Connection, wallet: AnchorProvider["wallet"]) {
        this.connection = connection;
        this.provider = new AnchorProvider(connection, wallet, {
            preflightCommitment: "confirmed",
        });
        this.program = new Program(idl as Idl, this.provider);
    }

    async enroll(wallet: PublicKey, courseId: string): Promise<TransactionSignature> {
        try {
            console.log(`Enrolling user ${wallet.toBase58()} in course ${courseId}...`);

            // Derive PDAs
            const [enrollmentPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("enrollment"), Buffer.from(courseId), wallet.toBuffer()],
                this.program.programId
            );

            const [coursePda] = PublicKey.findProgramAddressSync(
                [Buffer.from("course"), Buffer.from(courseId)],
                this.program.programId
            );

            // Send transaction
            const tx = await this.program.methods
                .enroll(courseId)
                .accounts({
                    learner: wallet,
                    enrollment: enrollmentPda, // Anchor resolves this, but explicit is safer
                    course: coursePda,
                    systemProgram: SystemProgram.programId,
                })
                .rpc();

            console.log("Enrollment success, tx:", tx);
            return tx;
        } catch (error) {
            console.error("Enrollment failed:", error);
            throw error;
        }
    }

    async completeLesson(wallet: PublicKey, courseId: string, lessonIndex: number): Promise<TransactionSignature> {
        try {
            console.log(`Completing lesson ${lessonIndex} for course ${courseId}...`);

            // Derive PDAs
            const [configPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("config")],
                this.program.programId
            );

            const [enrollmentPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("enrollment"), Buffer.from(courseId), wallet.toBuffer()],
                this.program.programId
            );

            const [coursePda] = PublicKey.findProgramAddressSync(
                [Buffer.from("course"), Buffer.from(courseId)],
                this.program.programId
            );

            // TODO: In a real app, verify the learner token account address accurately
            // For now we assume typical ATA derivation
            const learnerTokenAccount = PublicKey.findProgramAddressSync(
                [wallet.toBuffer(), new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb").toBuffer(), new PublicKey(process.env.NEXT_PUBLIC_XP_MINT!).toBuffer()],
                new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")
            )[0];

            // 1. Build the instruction (do NOT send yet)
            const instruction = await this.program.methods
                .completeLesson(lessonIndex)
                .accounts({
                    learner: wallet,
                    backendSigner: new PublicKey(process.env.NEXT_PUBLIC_BACKEND_SIGNER!), // The Teacher
                    enrollment: enrollmentPda,
                    config: configPda,
                    xpMint: new PublicKey(process.env.NEXT_PUBLIC_XP_MINT!),
                    learnerTokenAccount: learnerTokenAccount, // XP destination
                    course: coursePda,
                    tokenProgram: new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"), // Token-2022
                    systemProgram: SystemProgram.programId,
                })
                .instruction();

            // 2. Create Transaction and add instruction
            const transaction = new Transaction().add(instruction);
            transaction.feePayer = wallet;
            const latestBlockhash = await this.connection.getLatestBlockhash();
            transaction.recentBlockhash = latestBlockhash.blockhash;

            // 3. User signs partially
            const signedTx = await this.provider.wallet.signTransaction(transaction);

            // 4. Send to Backend Signer API
            const response = await fetch("/api/actions/sign-completion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    serializedTx: signedTx.serialize({ requireAllSignatures: false }).toString("base64")
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Backend signing failed");
            }

            const { signedTx: backendSignedTxBase64 } = await response.json();
            const backendSignedTx = Transaction.from(Buffer.from(backendSignedTxBase64, "base64"));

            // 5. Send fully signed transaction to network
            const txId = await this.connection.sendRawTransaction(backendSignedTx.serialize());
            await this.connection.confirmTransaction(txId);

            console.log("Lesson completion success, tx:", txId);
            return txId;

        } catch (error) {
            console.error("Lesson completion failed:", error);
            throw error;
        }
    }

    async getCourseProgress(wallet: PublicKey, courseId: string): Promise<CourseProgress | null> {
        try {
            const [enrollmentPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("enrollment"), Buffer.from(courseId), wallet.toBuffer()],
                this.program.programId
            );

            // Fetch account
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const account = this.program.account as any;
            const accountFn = account.enrollment;
            if (accountFn) {
                const enrollment = await accountFn.fetch(enrollmentPda);
                return {
                    courseId,
                    enrolledAt: enrollment.enrolledAt.toNumber() * 1000,
                    lessonsCompelted: 0, // Need to count bits in bitmap
                    lessonBitmap: enrollment.lessonBitmap.toNumber(),
                    completed: !!enrollment.completedAt
                };
            }
            return null;
        } catch (e) {
            // Account not found = not enrolled
            return null;
        }
    }

    async getXPBalance(wallet: PublicKey): Promise<number> {
        // Placeholder implementation
        return 0;
    }
}
