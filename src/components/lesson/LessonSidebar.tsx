"use client";

import { CheckCircle2, PlayCircle, Code2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Module } from "@/components/courses/ModuleList";

interface LessonSidebarProps {
    courseSlug: string;
    modules: Module[];
    currentLessonId: string;
}

// Helper for icons (reused logic, consider extracting to shared util later)
const LessonIcon = ({ type, isCompleted }: { type: "video" | "reading" | "challenge", isCompleted?: boolean }) => {
    if (isCompleted) return <CheckCircle2 className="h-4 w-4 text-primary" />;

    switch (type) {
        case "challenge": return <Code2 className="h-4 w-4" />;
        case "video": return <PlayCircle className="h-4 w-4" />;
        default: return <CheckCircle2 className="h-4 w-4" />;
    }
}

export function LessonSidebar({ courseSlug, modules, currentLessonId }: LessonSidebarProps) {
    return (
        <div className="flex h-full flex-col border-r border-border bg-surface">
            <div className="flex items-center border-b border-border p-4">
                <Link href={`/courses/${courseSlug}`} className="flex items-center text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back to Course
                </Link>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-6">
                    {modules.map((module, index) => (
                        <div key={module.id} className="space-y-2">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary px-2">
                                Module {index + 1}: {module.title}
                            </h3>
                            <div className="space-y-1">
                                {module.lessons.map((lesson) => {
                                    const isActive = lesson.id === currentLessonId;
                                    return (
                                        <Link
                                            key={lesson.id}
                                            href={`/courses/${courseSlug}/lessons/${lesson.id}`}
                                            className={cn(
                                                "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                                                isActive
                                                    ? "bg-primary/10 text-primary font-medium"
                                                    : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                                            )}
                                        >
                                            <LessonIcon type={lesson.type} />
                                            <span className="line-clamp-1">{lesson.title}</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
