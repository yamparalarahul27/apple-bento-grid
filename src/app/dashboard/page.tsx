"use client";

import { XPCard, StreakCard } from "@/components/dashboard/StatsCards";
import { EnrolledCourses } from "@/components/dashboard/EnrolledCourses";

export default function DashboardPage() {
    return (
        <div className="container min-h-screen py-12 px-4 md:px-6">
            <div className="mb-8">
                <h1 className="text-h2 font-bold text-text-primary">Dashboard</h1>
                <p className="text-text-secondary">Welcome back, Builder.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                <XPCard />
                <StreakCard />
                {/* Third card could be "Next Achievement" or "Latest Badge" - skipping for now to keep it simple */}
            </div>

            <EnrolledCourses />
        </div>
    );
}
