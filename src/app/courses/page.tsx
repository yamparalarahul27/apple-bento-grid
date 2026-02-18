"use client";

import { Search, ChevronRight, CheckCircle2 } from "lucide-react";
import { MOCK_TRACKS, MOCK_TRENDING_COURSES, MOCK_BOOTCAMPS } from "@/data/mock-courses";
import Image from "next/image";

export default function CoursesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* HERO SECTION (Light Background) */}
            <section className="bg-surface-2 py-16 px-4 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                        <h1 className="text-4xl font-bold text-text-primary mb-4">
                            Learn Solana Development
                        </h1>
                        <p className="text-xl text-text-secondary mb-8">
                            Build high-performance Web3 apps using Rust, Anchor, and Solana tooling.
                        </p>

                        {/* Quick Filters */}
                        <div className="flex flex-wrap gap-2 mb-8 justify-center">
                            {["New to Solana", "Become a Web3 Dev", "Build dApps", "Get Certified"].map(
                                (filter) => (
                                    <button
                                        key={filter}
                                        className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-primary hover:text-primary"
                                    >
                                        {filter}
                                    </button>
                                )
                            )}
                        </div>

                        {/* Search Bar */}
                        <div className="relative mb-8 max-w-2xl w-full">
                            <div className="relative flex items-center">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
                                <input
                                    type="text"
                                    placeholder="Ask our Solana AI Tutor..."
                                    className="h-12 w-full rounded-lg border border-border bg-surface pl-12 pr-12 text-text-primary placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 list-none rounded-md bg-primary p-2 text-primary-foreground transition-colors hover:bg-green-10">
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Quiz CTA */}
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                            <span>Not sure where to start?</span>
                            <a href="#" className="font-bold text-primary hover:underline">
                                Take the Solana path quiz →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT AREA (Dark/Default Background) */}
            <section className="flex-1 bg-background py-12 px-4 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* SIDEBAR */}
                        <aside className="hidden lg:block">
                            <h3 className="mb-4 text-lg font-bold text-text-primary">All tracks</h3>
                            <div className="flex flex-col gap-2">
                                {MOCK_TRACKS.map((track) => (
                                    <button
                                        key={track.id}
                                        className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors text-left ${track.active
                                            ? "bg-surface-2 text-primary"
                                            : "text-text-secondary hover:bg-surface hover:text-text-primary"
                                            }`}
                                    >
                                        {track.label}
                                        {track.active && <CheckCircle2 className="h-4 w-4" />}
                                    </button>
                                ))}
                            </div>
                        </aside>

                        {/* MAIN CONTENT */}
                        <div className="lg:col-span-3 space-y-12">
                            {/* Trending Section */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-text-primary">
                                        Trending Solana skills & stacks
                                    </h2>
                                    <div className="flex gap-2">
                                        <button className="p-2 rounded-lg bg-surface hover:bg-surface-2 text-text-primary transition-colors">
                                            <ChevronRight className="h-5 w-5 rotate-180" />
                                        </button>
                                        <button className="p-2 rounded-lg bg-surface hover:bg-surface-2 text-text-primary transition-colors">
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {MOCK_TRENDING_COURSES.map((course) => (
                                        <div
                                            key={course.id}
                                            className="group relative overflow-hidden rounded-lg border border-border bg-surface p-6 transition-all hover:border-primary"
                                        >
                                            <div className="mb-4 flex items-start justify-between">
                                                <div className={`h-12 w-12 rounded-lg ${course.accent} opacity-80`} /> {/* Placeholder for icon/logo */}
                                            </div>
                                            <h3 className="mb-2 text-xl font-bold text-text-primary">
                                                {course.title}
                                            </h3>
                                            <p className="mb-6 text-sm text-text-secondary">
                                                {course.description}
                                            </p>
                                            <button className="text-sm font-bold text-primary group-hover:underline">
                                                Explore track →
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bootcamps Section */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-text-primary">
                                        Upcoming Solana Bootcamps
                                    </h2>
                                    <div className="flex gap-2">
                                        <button className="p-2 rounded-lg bg-surface hover:bg-surface-2 text-text-primary transition-colors">
                                            <ChevronRight className="h-5 w-5 rotate-180" />
                                        </button>
                                        <button className="p-2 rounded-lg bg-surface hover:bg-surface-2 text-text-primary transition-colors">
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {MOCK_BOOTCAMPS.map((bootcamp) => (
                                        <div
                                            key={bootcamp.id}
                                            className="flex flex-col rounded-lg border border-border bg-surface p-6 transition-all hover:border-primary"
                                        >
                                            <div className="mb-4">
                                                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                                                    Starts in {bootcamp.startsIn}
                                                </span>
                                            </div>
                                            <h3 className="mb-2 text-lg font-bold text-text-primary">
                                                {bootcamp.title}
                                            </h3>
                                            <p className="mb-4 flex-1 text-sm text-text-secondary">
                                                {bootcamp.description}
                                            </p>

                                            <div className="mt-4 pt-4 border-t border-border space-y-2">
                                                <div className="flex justify-between text-xs text-text-secondary">
                                                    <span>Duration</span>
                                                    <span className="font-medium text-text-primary">{bootcamp.duration}</span>
                                                </div>
                                                <div className="flex justify-between text-xs text-text-secondary">
                                                    <span>Level</span>
                                                    <span className="font-medium text-text-primary">{bootcamp.level}</span>
                                                </div>
                                                <div className="flex justify-between text-xs text-text-secondary">
                                                    <span>Certificate</span>
                                                    <span className="font-medium text-text-primary">Included</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
