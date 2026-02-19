import { PublicKey, TransactionSignature } from "@solana/web3.js";
import { CourseProgress, LearningProgressService } from "./learning-progress.service";

export class LocalLearningProgressService implements LearningProgressService {
    async enroll(wallet: PublicKey, courseId: string): Promise<TransactionSignature> {
        console.log(`[Local] Enrolling ${wallet.toBase58()} in course ${courseId}`);
        // Mock success
        return "mock_tx_signature";
    }

    async completeLesson(wallet: PublicKey, courseId: string, lessonIndex: number): Promise<TransactionSignature> {
        console.log(`[Local] Completing lesson ${lessonIndex} for ${courseId}`);
        return "mock_tx_signature";
    }

    async getCourseProgress(wallet: PublicKey, courseId: string): Promise<CourseProgress | null> {
        // Mock progress
        return {
            courseId,
            enrolledAt: Date.now(),
            lessonsCompelted: 0,
            completed: false,
            lessonBitmap: 0
        };
    }

    async getXPBalance(wallet: PublicKey): Promise<number> {
        return 100; // Mock balance
    }
}

export const localLearningService = new LocalLearningProgressService();
