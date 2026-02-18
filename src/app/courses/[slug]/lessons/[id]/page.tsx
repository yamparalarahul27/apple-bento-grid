import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MOCK_COURSES } from "@/data/mock-courses";
import { LessonClient } from "@/components/lesson/LessonClient";

interface PageProps {
    params: Promise<{
        slug: string;
        id: string; // lessonId
    }>
}

// Helper to find lesson
const getLessonData = (courseSlug: string, lessonId: string) => {
    const course = MOCK_COURSES.find((c) => c.id === courseSlug);
    if (!course?.modules) return null;

    for (const mod of course.modules) {
        const lesson = mod.lessons.find((l) => l.id === lessonId);
        if (lesson) return lesson;
    }
    return null;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, id } = await params;
    const lesson = getLessonData(slug, id);

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
    const lesson = getLessonData(slug, id);

    if (!lesson) {
        return notFound();
    }

    return (
        <LessonClient
            courseSlug={slug}
            lessonId={id}
            lesson={lesson}
        />
    );
}

// Optional: Static Params for SSG
export function generateStaticParams() {
    const params: { slug: string; id: string }[] = [];

    MOCK_COURSES.forEach(course => {
        course.modules?.forEach(mod => {
            mod.lessons.forEach(lesson => {
                params.push({
                    slug: course.id,
                    id: lesson.id
                });
            });
        });
    });

    return params;
}
