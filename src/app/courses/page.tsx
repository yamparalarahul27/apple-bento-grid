import { CurriculumService } from "@/services/curriculum.service";
import { CourseCatalog } from "@/components/courses/CourseCatalog";
import { Course } from "@/components/courses/CourseCard";

export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
    const sanityCourses = await CurriculumService.getCourses();

    const initialCourses: Course[] = sanityCourses.map(c => ({
        id: c._id,
        title: c.title,
        description: c.description,
        thumbnail: c.thumbnail, // CourseCard now handles Sanity images
        difficulty: c.difficulty,
        duration: c.duration,
        modules: (c as { modulesCount?: number }).modulesCount || 0,
        slug: c.slug,
    }));

    return <CourseCatalog initialCourses={initialCourses} />;
}
