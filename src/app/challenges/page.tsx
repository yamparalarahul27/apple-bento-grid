import { LessonClient } from "@/components/lesson/LessonClient";
import { MOCK_COURSES } from "@/data/mock-courses";
import { notFound } from "next/navigation";

export default function ChallengesPage() {
    // Pick a featured challenge (e.g., l-1-1 from solana-fundamentals)
    const course = MOCK_COURSES.find(c => c.id === "solana-fundamentals");
    const lesson = course?.modules?.[0]?.lessons?.[0];

    if (!lesson) {
        return notFound();
    }

    return (
        <LessonClient
            courseSlug="solana-fundamentals"
            lessonId={lesson.id}
            lesson={lesson}
        />
    );
}
