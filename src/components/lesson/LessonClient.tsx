"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/lesson/CodeEditor";
import { CompletionModal } from "@/components/lesson/CompletionModal";

interface LessonClientProps {
    courseSlug: string;
    lessonId: string;
    lesson: {
        id: string;
        title: string;
        content?: string;
    };
}

import { useLearningService } from "@/hooks/useLearningService";
import { useWallet } from "@solana/wallet-adapter-react";
import { Loader2 } from "lucide-react";

export function LessonClient({ courseSlug, lessonId, lesson }: LessonClientProps) {
    // Layout state
    const [isClient, setIsClient] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);

    const { connected, publicKey } = useWallet();
    const learningService = useLearningService();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleComplete = async () => {
        if (!connected || !publicKey) {
            alert("Please connect your wallet first.");
            return;
        }
        if (!learningService) return;

        setIsCompleting(true);
        try {
            // Assume lessonId "1" -> index 0
            const lessonIndex = parseInt(lessonId) - 1;
            const tx = await learningService.completeLesson(publicKey, courseSlug, lessonIndex);
            console.log("Lesson completed!", tx);
            setIsCompleted(true);
        } catch (error: unknown) {
            console.error("Completion error:", error);
            const message = error instanceof Error ? error.message : "Unknown error";
            alert(`Failed to complete lesson: ${message}`);
        } finally {
            setIsCompleting(false);
        }
    };

    if (!isClient) return null; // Avoid hydration mismatch on resize panels

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
                    <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-green-10 font-bold"
                        onClick={handleComplete}
                        disabled={isCompleting || isCompleted}
                    >
                        {isCompleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                        {isCompleting ? "Signing..." : (isCompleted ? "Completed" : "Mark Complete")}
                    </Button>
                </div>
            </div>

            {/* Split Content Area */}
            <div className="flex-1 overflow-hidden relative">
                <ResizablePanelGroup orientation="horizontal" className="h-full w-full rounded-none border-0">

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
                        <CodeEditor />
                    </ResizablePanel>

                </ResizablePanelGroup>
            </div>

            <CompletionModal
                isOpen={isCompleted}
                onClose={() => setIsCompleted(false)}
                xpEarned={50}
                nextLessonUrl={`/courses/${courseSlug}/lessons/${parseInt(lessonId) + 1}`} // Mock next lesson logic
            />
        </div>
    );
}
