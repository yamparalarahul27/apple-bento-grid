import { LessonClient } from "@/components/lesson/LessonClient";
import { notFound } from "next/navigation";
import { CurriculumService } from "@/services/curriculum.service";
import { PortableTextBlock } from "@portabletext/types";

export const dynamic = 'force-dynamic';

export default async function ChallengesPage() {
    const courses = await CurriculumService.getCourses();
    const firstCourseSlug = courses[0]?.slug;

    if (!firstCourseSlug) return notFound();

    const course = await CurriculumService.getCourseBySlug(firstCourseSlug);
    const lesson = course?.modules?.[0]?.lessons?.[0];

    if (!lesson) {
        return notFound();
    }

    const typedLesson = lesson as unknown as {
        _id: string;
        title: string;
        content?: PortableTextBlock[];
    };

    return (
        <LessonClient
            courseSlug={firstCourseSlug}
            lessonId={lesson.slug} // Use slug as ID
            lesson={typedLesson}
        />
    );
}
