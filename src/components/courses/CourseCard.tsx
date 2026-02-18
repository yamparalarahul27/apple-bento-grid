import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock, BarChart, CheckCircle2 } from "lucide-react";
import { Module } from "@/components/courses/ModuleList";

export interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    duration: string;
    modules: number;
    slug: string;
    progress?: number;
    moduleContent?: Module[];
}

export function CourseCard({ course }: { course: Course }) {
    // Map difficulty to color
    const difficultyColor = {
        Beginner: "bg-green-3 text-green-11 border-green-5",
        Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200", // Fallback if brand-yellow not perfect in badge
        Advanced: "bg-red-100 text-red-800 border-red-200",
    };

    return (
        <Link
            href={`/courses/${course.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
        >
            <div className="relative aspect-video w-full overflow-hidden bg-surface-2">
                <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${difficultyColor[course.difficulty]}`}>
                        {course.difficulty}
                    </span>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="text-h4 font-bold text-text-primary line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                </h3>
                <p className="text-body-2 text-text-secondary line-clamp-2 mb-4 flex-1">
                    {course.description}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs text-text-secondary">
                    <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <BarChart className="h-3.5 w-3.5" />
                        <span>{course.modules} Modules</span>
                    </div>
                </div>

                {/* Progress Bar (if enrolled - stub for now) */}
                {course.progress !== undefined && (
                    <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium text-text-primary">{course.progress}% Complete</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${course.progress}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
}
