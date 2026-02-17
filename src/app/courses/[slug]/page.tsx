"use client";

import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Clock, BookOpen, PlayCircle, FileText, Code, CheckCircle2 } from "lucide-react";
import { MOCK_COURSES } from "@/data/mock-courses";
import Link from "next/link";

export default function CourseDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    // Fallback to "solana-fundamentals" if not found (for demo purposes)
    const course = MOCK_COURSES.find((c) => c.id === slug) || MOCK_COURSES[0];

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* HEADER / BREADCRUMB PLACEHOLDER */}
            <div className="border-b border-border bg-surface/50 backdrop-blur-sm">
                <div className="container mx-auto py-4 text-sm text-text-secondary">
                    Courses <span className="mx-2 text-border">/</span> {course.title}
                </div>
            </div>

            {/* HERO SECTION */}
            <section className="bg-surface-2 py-12 border-b border-border">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className={`h-32 w-32 rounded-2xl ${course.accent} flex-shrink-0`} /> {/* Thumbnail Placeholder */}

                        <div className="flex-1 space-y-4">
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="bg-surface border-border text-text-primary">
                                    {course.difficulty || "Beginner"}
                                </Badge>
                                <Badge variant="outline" className="text-text-secondary border-border gap-1">
                                    <Clock className="w-3 h-3" /> {course.duration || "40 Hours"}
                                </Badge>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
                                {course.title}
                            </h1>
                            <p className="text-xl text-text-secondary max-w-2xl text-pretty">
                                {course.description}
                            </p>

                            <div className="flex gap-3 pt-2">
                                <Button className="font-bold text-md px-8 py-6 rounded-full">
                                    Start Learning
                                </Button>
                                <Button variant="ghost" className="text-text-secondary hover:text-text-primary">
                                    Bookmark
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT & SYLLABUS */}
            <div className="container mx-auto max-w-5xl py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* LEFT COLUMN: WHAT YOU'LL LEARN */}
                <div className="lg:col-span-4 space-y-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-green-1" /> What you'll learn
                        </h3>
                        <ul className="space-y-3">
                            {[
                                "Understand the Solana programming model",
                                "Build programs using Rust & Anchor",
                                "Master CPIs and PDA management",
                                "Deploy and test on Devnet"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm text-text-secondary items-start">
                                    <CheckCircle2 className="w-4 h-4 text-green-1 flex-shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Separator className="bg-border" />

                    {/* INSTRUCTOR CARD */}
                    <div className="p-6 rounded-xl border border-border bg-surface">
                        <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-text-secondary">Instructor</h4>
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-green-2" />
                            <div>
                                <div className="font-bold text-text-primary">Superteam DAO</div>
                                <div className="text-xs text-text-secondary">Solana Ecosystem</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: SYLLABUS */}
                <div className="lg:col-span-8">
                    <h3 className="text-2xl font-bold mb-6">Course Syllabus</h3>

                    <Accordion type="single" collapsible defaultValue="mod-1" className="w-full space-y-4">
                        {course.modules?.map((module, index) => (
                            <AccordionItem
                                key={module.id}
                                value={module.id}
                                className="border border-border rounded-xl bg-surface px-6 data-[state=open]:border-green-1/50 overflow-hidden"
                            >
                                <AccordionTrigger className="hover:no-underline py-4">
                                    <div className="flex flex-col text-left">
                                        <span className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">
                                            Module {index + 1}
                                        </span>
                                        <span className="text-lg font-bold text-text-primary">
                                            {module.title}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-4">
                                    <div className="space-y-1 pt-2">
                                        {module.lessons.map((lesson) => (
                                            <Link
                                                href={`/courses/${slug}/lessons/${lesson.id}`}
                                                key={lesson.id}
                                                className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-2 group cursor-pointer transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <LessonIcon type={lesson.type} />
                                                    <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                                                        {lesson.title}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-text-secondary">
                                                    {lesson.duration}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}

                        {!course.modules && (
                            <div className="p-8 text-center border border-dashed border-border rounded-xl text-text-secondary">
                                Syllabus content coming soon...
                            </div>
                        )}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

function LessonIcon({ type }: { type: string }) {
    if (type === "video") return <PlayCircle className="w-4 h-4 text-blue-400" />;
    if (type === "quiz") return <CheckCircle2 className="w-4 h-4 text-green-400" />;
    if (type === "challenge") return <Code className="w-4 h-4 text-orange-400" />;
    return <FileText className="w-4 h-4 text-text-secondary" />;
}
