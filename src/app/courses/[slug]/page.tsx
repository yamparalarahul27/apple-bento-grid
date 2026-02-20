import { CourseHeader } from "@/components/courses/CourseHeader";
import { ModuleList, Module } from "@/components/courses/ModuleList";
import { notFound } from "next/navigation";
import { CurriculumService } from "@/services/curriculum.service";
import { Metadata } from "next";
import { urlFor } from "@/lib/sanity";

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{
        slug: string;
    }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const course = await CurriculumService.getCourseBySlug(slug);

    if (!course) {
        return {
            title: "Course Not Found",
        };
    }

    return {
        title: course.title,
        description: course.description,
        openGraph: {
            title: course.title,
            description: course.description,
            images: course.thumbnail ? [urlFor(course.thumbnail).url()] : ["/og-image.jpg"],
        },
    };
}

export default async function CourseDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const sanityCourse = await CurriculumService.getCourseBySlug(slug);

    if (!sanityCourse) {
        return notFound();
    }

    // Map SanityCourse to the format expected by components
    const course = {
        id: sanityCourse._id,
        title: sanityCourse.title,
        description: sanityCourse.description,
        thumbnail: sanityCourse.thumbnail,
        difficulty: sanityCourse.difficulty,
        duration: sanityCourse.duration,
        slug: sanityCourse.slug,
        modules: sanityCourse.modules?.length || 0,
    };

    const modules: Module[] = (sanityCourse.modules || []).map(m => ({
        id: m._id,
        title: m.title,
        lessons: m.lessons.map(l => ({
            id: l._id,
            title: l.title,
            type: l.type as 'reading' | 'challenge' | 'video',
            duration: l.duration,
            slug: l.slug
        }))
    }));

    return (
        <div className="min-h-screen pb-20">
            <CourseHeader course={course as unknown as { id: string; title: string; description: string; thumbnail: unknown; difficulty: "Beginner" | "Intermediate" | "Advanced"; duration: string; slug: string; modules: number; }} />

            <div className="container px-4 md:px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <ModuleList modules={modules} courseSlug={slug} />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-surface-2/30 rounded-lg p-6 border border-border">
                        <h4 className="text-h4 font-bold text-text-primary mb-2">Prerequisites</h4>
                        <ul className="list-disc list-inside text-body-2 text-text-secondary space-y-1">
                            <li>Basic programming knowledge</li>
                            <li>Terminal/CLI familiarity</li>
                            <li>Node.js installed</li>
                        </ul>
                    </div>
                    <div className="bg-surface-2/30 rounded-lg p-6 border border-border">
                        <h4 className="text-h4 font-bold text-text-primary mb-2">What you&apos;ll learn</h4>
                        <ul className="list-disc list-inside text-body-2 text-text-secondary space-y-1">
                            <li>Solana Accounts Model</li>
                            <li>SPL Tokens</li>
                            <li>PDA Management</li>
                            <li>CPIs (Cross Program Invocations)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const courses = await CurriculumService.getCourses();
    return courses.map((c) => ({
        slug: c.slug,
    }));
}
