import { Badge } from "@/components/ui/badge";
import { Clock, BarChart, Trophy, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Course } from "./CourseCard"; // Re-using interface

interface CourseHeaderProps {
    course: Course;
}

export function CourseHeader({ course }: CourseHeaderProps) {
    return (
        <div className="bg-surface border-b border-border pb-12 pt-8">
            <div className="container px-4 md:px-6">
                <Link href="/courses" className="inline-flex items-center text-sm text-text-secondary hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Courses
                </Link>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1 space-y-6">
                        <div className="space-y-4">
                            <Badge variant={course.difficulty === "Beginner" ? "default" : "secondary"}>
                                {course.difficulty}
                            </Badge>
                            <h1 className="text-display-2 font-bold text-text-primary leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-h4 text-text-secondary max-w-2xl">
                                {course.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-6 text-body-2 text-text-secondary">
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BarChart className="h-5 w-5" />
                                <span>{course.modules} Modules</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-brand-yellow" />
                                <span>Earn Certificate</span>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button className="rounded-lg bg-primary px-8 py-4 text-h4 font-bold text-primary-foreground transition-all hover:bg-green-10 hover:shadow-lg active:scale-95">
                                Enroll Verification
                            </button>
                            <p className="mt-2 text-caption text-text-secondary">
                                * Requires wallet connection (Mock for Phase 1)
                            </p>
                        </div>
                    </div>

                    {/* Placeholder for Course Image/Preview - decorative for header */}
                    <div className="hidden lg:block w-1/3 aspect-video bg-surface-2 rounded-xl border border-border overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <span className="text-xs font-mono text-primary bg-surface/80 px-2 py-1 rounded">Course Preview</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
