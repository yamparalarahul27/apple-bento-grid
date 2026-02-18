"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { MOCK_COURSES } from "@/data/mock-courses";
import Link from "next/link";

export default function LessonPage() {
    const params = useParams();
    const courseSlug = params.slug as string;
    const lessonId = params.id as string;

    // Find Course and Lesson
    const course = MOCK_COURSES.find((c) => c.id === courseSlug);

    // Helper to find lesson in modules
    const getLesson = () => {
        if (!course?.modules) return null;
        for (const mod of course.modules) {
            const lesson = mod.lessons.find((l) => l.id === lessonId);
            if (lesson) return lesson;
        }
        return null;
    };

    const lesson = getLesson();

    // Layout state
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; // Avoid hydration mismatch on resize panels

    if (!course || !lesson) {
        return <div className="p-8 text-center text-text-primary">Lesson not found: {courseSlug} / {lessonId}</div>;
    }

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col bg-background">
            {/* Mini Header / Navigation Bar */}
            <div className="h-14 border-b border-border bg-surface flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href={`/courses/${courseSlug}`} className="text-text-secondary hover:text-text-primary flex items-center gap-1 text-sm transition-colors">
                        <ChevronLeft className="w-4 h-4" /> Back to Course
                    </Link>
                    <div className="h-4 w-[1px] bg-border" />
                    <h1 className="font-bold text-text-primary text-sm md:text-base line-clamp-1">
                        {lesson.title}
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden md:flex bg-surface hover:bg-surface-2 text-text-primary border-border">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                    </Button>
                    <Button variant="outline" size="sm" className="hidden md:flex bg-surface hover:bg-surface-2 text-text-primary border-border">
                        Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-green-10 font-bold">
                        <CheckCircle className="w-4 h-4 mr-2" /> Mark Complete
                    </Button>
                </div>
            </div>

            {/* Split Content Area */}
            <div className="flex-1 overflow-hidden relative">
                <ResizablePanelGroup direction="horizontal" className="h-full w-full rounded-none border-0">

                    {/* LEFT PANEL: LESSON CONTENT */}
                    <ResizablePanel defaultSize={40} minSize={20} className="bg-background">
                        <div className="h-full w-full overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                            <article className="prose prose-invert prose-green max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary prose-code:text-primary">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {lesson.content || "No content available for this lesson."}
                                </ReactMarkdown>
                            </article>
                        </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle className="bg-border hover:bg-primary transition-colors w-1.5" />

                    {/* RIGHT PANEL: EDITOR / IFRAME */}
                    <ResizablePanel defaultSize={60} minSize={30} className="bg-[#1e1e1e]">
                        <div className="h-full w-full relative">
                            <iframe
                                src="https://beta.solpg.io"
                                className="w-full h-full border-0 absolute inset-0"
                                title="Solana Playground"
                                allow="clipboard-read; clipboard-write"
                            />
                        </div>
                    </ResizablePanel>

                </ResizablePanelGroup>
            </div>
        </div>
    );
}
