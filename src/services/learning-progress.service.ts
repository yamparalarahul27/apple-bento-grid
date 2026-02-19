import { PublicKey, TransactionSignature } from "@solana/web3.js";

export interface CourseProgress {
    courseId: string;
    enrolledAt: number; // Unix timestamp
    lessonsCompelted: number;
    completed: boolean;
    lessonBitmap: number; // 256-bit bitmap represented as number (or BigInt?)
}

export interface LearningProgressService {
    /**
     * Enrolls a user in a course.
     * @returns The transaction signature of the enrollment.
     */
    enroll(wallet: PublicKey, courseId: string): Promise<TransactionSignature>;

    /**
     * Marks a lesson as complete.
     * Use the backend signer API to co-sign the transaction.
     */
    completeLesson(
        wallet: PublicKey,
        courseId: string,
        lessonIndex: number
    ): Promise<TransactionSignature>;

    /**
     * Gets the current progress of a learner for a specific course.
     */
    getCourseProgress(
        wallet: PublicKey,
        courseId: string
    ): Promise<CourseProgress | null>;

    /**
     * Gets the user's current XP balance from the on-chain mint.
     */
    getXPBalance(wallet: PublicKey): Promise<number>;
}
