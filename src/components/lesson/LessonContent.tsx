import { CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";

interface LessonContentProps {
    title: string;
    content: string; // Markdown or HTML string
    type: "video" | "reading" | "challenge";
    onComplete?: () => void;
}

export function LessonContent({ title, content, type, onComplete }: LessonContentProps) {
    return (
        <div className="flex h-full flex-col bg-background">
            <div className="border-b border-border p-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-caption font-bold bg-surface-2 px-2 py-1 rounded text-text-secondary uppercase">
                        {type}
                    </span>
                </div>
                <h1 className="text-h2 font-bold text-text-primary">{title}</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="prose prose-invert max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary prose-a:text-primary">
                    {/* Simplified content rendering for now */}
                    {type === 'video' ? (
                        <div className="aspect-video w-full bg-black rounded-lg mb-8 flex items-center justify-center border border-border">
                            <p className="text-text-secondary">Video Player Placeholder</p>
                        </div>
                    ) : null}

                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>

            <div className="border-t border-border p-6 bg-surface flex justify-between items-center">
                <button className="flex items-center text-sm font-medium text-text-secondary hover:text-text-primary disabled:opacity-50" disabled>
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous Lesson
                </button>

                <button
                    onClick={onComplete}
                    className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-green-10 transition-colors"
                >
                    <CheckCircle2 className="h-4 w-4" />
                    Mark as Complete
                </button>

                <button className="flex items-center text-sm font-medium text-text-secondary hover:text-text-primary">
                    Next Lesson
                    <ChevronRight className="ml-1 h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
