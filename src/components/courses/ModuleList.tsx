import { CheckCircle2, Lock, PlayCircle, Code2 } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface Lesson {
    id: string;
    title: string;
    type: "video" | "reading" | "challenge";
    duration: string;
}

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

interface ModuleListProps {
    modules: Module[];
}

// Helper to render icon based on lesson type
const LessonIcon = ({ type }: { type: Lesson["type"] }) => {
    switch (type) {
        case "challenge": return <Code2 className="h-4 w-4 text-brand-yellow" />;
        case "video": return <PlayCircle className="h-4 w-4 text-primary" />;
        default: return <CheckCircle2 className="h-4 w-4 text-text-secondary" />;
    }
}

export function ModuleList({ modules }: ModuleListProps) {
    if (!modules || modules.length === 0) {
        return <div className="text-text-secondary">No modules available.</div>;
    }

    return (
        <div className="w-full max-w-3xl">
            <h2 className="text-h3 font-bold text-text-primary mb-6">Course Content</h2>
            <Accordion type="single" collapsible className="w-full space-y-4" defaultValue={modules[0]?.id}>
                {modules.map((module, index) => (
                    <AccordionItem key={module.id} value={module.id} className="border border-border rounded-lg bg-surface px-0">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-surface-2/50 rounded-t-lg data-[state=open]:bg-surface-2/50 transition-colors">
                            <div className="flex flex-col items-start text-left">
                                <span className="text-overline text-text-secondary uppercase tracking-wider mb-1">Module {index + 1}</span>
                                <span className="text-h4 font-bold text-text-primary">{module.title}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-0 pb-0">
                            <div className="flex flex-col divide-y divide-border border-t border-border">
                                {module.lessons.map((lesson) => (
                                    <div key={lesson.id} className="flex items-center justify-between px-6 py-4 hover:bg-surface-2/30 transition-colors group cursor-not-allowed opacity-70">
                                        <div className="flex items-center gap-3">
                                            <LessonIcon type={lesson.type} />
                                            <span className="text-body-2 font-medium text-text-primary group-hover:text-primary transition-colors">
                                                {lesson.title}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-caption text-text-secondary">{lesson.duration}</span>
                                            <Lock className="h-3 w-3 text-text-secondary" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
