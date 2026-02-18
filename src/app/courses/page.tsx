"use client";

import { useState } from "react";
import { Course, CourseCard } from "@/components/courses/CourseCard";
import { Search, BookOpen } from "lucide-react";

// MOCK DATA - To be replaced by Sanity CMS later
const COURSES: Course[] = [
    {
        id: "1",
        title: "Solana Fundamentals",
        description:
            "The comprehensive guide to building on Solana. Learn the basics of accounts, transactions, and programs.",
        thumbnail: "/placeholders/course-fundamentals.jpg", // Placeholder
        difficulty: "Beginner",
        duration: "4 hours",
        modules: 6,
        slug: "solana-fundamentals",
        progress: 0,
    },
    {
        id: "2",
        title: "Rust for Solana",
        description:
            "Master Rust programming specifically for Solana smart contract development. No prior Rust experience required.",
        thumbnail: "/placeholders/course-rust.jpg",
        difficulty: "Beginner",
        duration: "6 hours",
        modules: 8,
        slug: "rust-for-solana",
    },
    {
        id: "3",
        title: "Anchor Framework",
        description:
            "Build secure and scalable Solana programs faster using the Anchor framework.",
        thumbnail: "/placeholders/course-anchor.jpg",
        difficulty: "Intermediate",
        duration: "8 hours",
        modules: 10,
        slug: "anchor-framework",
    },
    {
        id: "4",
        title: "Token Program (SPL)",
        description:
            "Create your own fungible and non-fungible tokens using the Solana Program Library.",
        thumbnail: "/placeholders/course-spl.jpg",
        difficulty: "Intermediate",
        duration: "5 hours",
        modules: 5,
        slug: "token-program",
    },
    {
        id: "5",
        title: "Solana Mobile Stack",
        description:
            "Build mobile-first crypto applications for the Saga phone and Android devices.",
        thumbnail: "/placeholders/course-mobile.jpg",
        difficulty: "Advanced",
        duration: "7 hours",
        modules: 7,
        slug: "solana-mobile",
    },
    {
        id: "6",
        title: "Security & Auditing",
        description:
            "Learn common vulnerabilities and how to audit Solana programs for security.",
        thumbnail: "/placeholders/course-security.jpg",
        difficulty: "Advanced",
        duration: "6 hours",
        modules: 6,
        slug: "security-auditing",
    },
];

const FILTERS = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCourses = COURSES.filter((course) => {
        const matchesFilter =
            activeFilter === "All" || course.difficulty === activeFilter;
        const matchesSearch =
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="container min-h-screen py-12 px-4 md:px-6">
            {/* Header */}
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-h2 font-bold text-text-primary mb-2">
                        Course Catalog
                    </h1>
                    <p className="text-body-1 text-text-secondary">
                        Master Solana development with our interactive curriculum.
                    </p>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center">
                {/* Search */}
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-border bg-surface px-10 py-3 text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                    {FILTERS.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeFilter === filter
                                ? "bg-primary text-primary-foreground"
                                : "bg-surface border border-border text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Course Grid */}
            {filteredCourses.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="mb-4 rounded-full bg-surface-2 p-4">
                        <BookOpen className="h-8 w-8 text-text-secondary" />
                    </div>
                    <h3 className="text-h3 font-bold text-text-primary mb-2">
                        No courses found
                    </h3>
                    <p className="text-body-1 text-text-secondary max-w-sm">
                        Try adjusting your search or filters to find what you&apos;re looking
                        for.
                    </p>
                    <button
                        onClick={() => {
                            setActiveFilter("All");
                            setSearchQuery("");
                        }}
                        className="mt-6 text-primary hover:underline font-bold"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
}
