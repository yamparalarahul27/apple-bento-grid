import { CourseCard } from "@/components/courses/CourseCard";
import Link from "next/link";

// Mock enrolled courses (subset of main catalog with progress)
const ENROLLED_COURSES = [
    {
        id: "1",
        title: "Solana Fundamentals",
        description: "The comprehensive guide to building on Solana.",
        thumbnail: "/placeholders/course-fundamentals.jpg",
        difficulty: "Beginner" as const,
        duration: "4 hours",
        modules: 6,
        slug: "solana-fundamentals",
        progress: 45,
    },
    {
        id: "2",
        title: "Rust for Solana",
        description: "Master Rust programming for smart contracts.",
        thumbnail: "/placeholders/course-rust.jpg",
        difficulty: "Beginner" as const,
        duration: "6 hours",
        modules: 8,
        slug: "rust-for-solana",
        progress: 12,
    },
];

export function EnrolledCourses() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-h3 font-bold text-text-primary">Continue Learning</h2>
                <Link href="/courses" className="text-body-2 font-bold text-primary hover:underline">View All Courses</Link>
            </div>

            {ENROLLED_COURSES.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {ENROLLED_COURSES.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-border p-8 text-center bg-surface/50">
                    <p className="text-text-secondary">You haven&apos;t enrolled in any courses yet.</p>
                </div>
            )}
        </div>
    );
}
