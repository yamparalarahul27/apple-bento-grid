"use client";

import { XPCard, StreakCard } from "@/components/dashboard/StatsCards";
import { EnrolledCourses } from "@/components/dashboard/EnrolledCourses";
import { CertificateThumb } from "@/components/certificates/CertificateThumb";

const MOCK_CERTIFICATES = [
    {
        id: "solana-fundamentals-1",
        courseTitle: "Solana Fundamentals",
        recipientName: "Rahul Yamparala",
        completionDate: "Feb 18, 2024"
    },
    {
        id: "rust-for-solana-2",
        courseTitle: "Rust for Solana",
        recipientName: "Rahul Yamparala",
        completionDate: "Dec 12, 2023"
    }
];

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

            <div className="space-y-12">
                <EnrolledCourses />

                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-text-primary">My Certificates</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {MOCK_CERTIFICATES.map((cert) => (
                            <CertificateThumb key={cert.id} {...cert} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
