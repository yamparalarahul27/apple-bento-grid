import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonClient } from "@/components/lesson/LessonClient";
import { CurriculumService } from "@/services/curriculum.service";
import { PortableTextBlock } from "@portabletext/types";

interface PageProps {
    params: Promise<{
        slug: string; // courseSlug
        id: string;   // lessonSlug
    }>
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, id } = await params;
    const lesson = await CurriculumService.getLessonBySlug(slug, id);

    if (!lesson) {
        return {
            title: "Lesson Not Found",
        };
    }

    return {
        title: lesson.title,
        description: `Learn ${lesson.title} on Superteam Brazil Academy.`,
    };
}

export default async function LessonPage({ params }: PageProps) {
    const { slug, id } = await params;
    const lesson = await CurriculumService.getLessonBySlug(slug, id);

    if (!lesson) {
        return notFound();
    }

    // Explicitly typed lesson to satisfy strict any check
    const typedLesson = lesson as unknown as {
        _id: string;
        title: string;
        content?: PortableTextBlock[];
    };

    return (
        <LessonClient
            courseSlug={slug}
            lessonId={id}
            lesson={typedLesson}
        />
    );
}

export async function generateStaticParams() {
    const courses = await CurriculumService.getCourses();
    const params: { slug: string; id: string }[] = [];

    for (const course of courses) {
        // We need the full course to get the lesson slugs
        const fullCourse = await CurriculumService.getCourseBySlug(course.slug);
        if (fullCourse?.modules) {
            for (const mod of fullCourse.modules) {
                for (const lesson of mod.lessons) {
                    params.push({
                        slug: fullCourse.slug,
                        id: lesson.slug
                    });
                }
            }
        }
    }

    return params;
}
