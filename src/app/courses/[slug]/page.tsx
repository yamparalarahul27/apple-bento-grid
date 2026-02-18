import { CourseHeader } from "@/components/courses/CourseHeader";
import { ModuleList, Module } from "@/components/courses/ModuleList";
import { Course } from "@/components/courses/CourseCard";
import { notFound } from "next/navigation";

// Extended mock data to include modules (In real app, this comes from Sanity)
// We need to define the type here locally or extend the one from CourseCard if we exported it properly
// For now, let's redefine a robust mock structure.

// Extended mock data to include modules (In real app, this comes from Sanity)
// Redefine a robust mock structure.
interface CourseWithModules extends Course {
    moduleContent: Module[];
}

const COURSE_CONTENT_MOCK: Record<string, CourseWithModules> = {
    "solana-fundamentals": {
        id: "1",
        title: "Solana Fundamentals",
        description: "The comprehensive guide to building on Solana. Learn the basics of accounts, transactions, and programs. Perfect for developers transitioning from Web2 or EVM chains.",
        thumbnail: "/placeholders/course-fundamentals.jpg",
        difficulty: "Beginner",
        duration: "4 hours",
        modules: 3,
        slug: "solana-fundamentals",
        moduleContent: [
            {
                id: "m1",
                title: "Introduction to Solana",
                lessons: [
                    { id: "l-1-1", title: "What is Solana?", type: "reading", duration: "10 min" },
                    { id: "l-1-2", title: "Setup Local Environment", type: "reading", duration: "45 min" },
                    { id: "l-1-3", title: "Wallet Basics", type: "reading", duration: "15 min" },
                ]
            },
            {
                id: "m2",
                title: "Accounts & Transactions",
                lessons: [
                    { id: "l-2-1", title: "The Account Model", type: "reading", duration: "25 min" },
                    { id: "l-2-2", title: "Rent & Storage", type: "reading", duration: "20 min" },
                    { id: "l-2-3", title: "Transaction Instructions", type: "challenge", duration: "30 min" },
                ]
            },
            {
                id: "m3",
                title: "Programs (Smart Contracts)",
                lessons: [
                    { id: "l-3-1", title: "Hello World Program", type: "reading", duration: "45 min" },
                    { id: "l-3-2", title: "Deploying to Devnet", type: "challenge", duration: "30 min" },
                ]
            }
        ]
    },
    "rust-for-solana": {
        id: "2",
        title: "Rust for Solana",
        description: "Master Rust programming specifically for Solana smart contract development.",
        thumbnail: "/placeholders/course-rust.jpg",
        difficulty: "Beginner",
        duration: "6 hours",
        modules: 0,
        slug: "rust-for-solana",
        moduleContent: []
    }
};

import { Metadata } from "next";

interface PageProps {
    params: Promise<{
        slug: string;
    }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const course = COURSE_CONTENT_MOCK[slug];

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
            images: [course.thumbnail || "/og-image.jpg"],
        },
    };
}

export default async function CourseDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const course = COURSE_CONTENT_MOCK[slug];

    if (!course) {
        // In a real app we'd fetch or return 404
        // For testing layout, if slug doesn't match mock, show 404
        return notFound();
    }

    return (
        <div className="min-h-screen pb-20">
            <CourseHeader course={course} />

            <div className="container px-4 md:px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <ModuleList modules={course.moduleContent || []} courseSlug={slug} />
                </div>

                {/* Sidebar (Optional widgets: Instructor, Prerequisites, etc.) */}
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

// Static params generation for SSG (optional but good for performance)
export function generateStaticParams() {
    return Object.keys(COURSE_CONTENT_MOCK).map((slug) => ({
        slug,
    }));
}
