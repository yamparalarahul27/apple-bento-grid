import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { SkillRadar } from "@/components/profile/SkillRadar";
import { BadgesGrid } from "@/components/profile/BadgesGrid";
import { CertificatesList } from "@/components/profile/CertificatesList";
import { CertificateThumb } from "@/components/certificates/CertificateThumb";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock Data
const USER_MOCK = {
    name: "Rahul Yamparala",
    username: "ryamparala",
    avatar: "/pf/pf 1.png",
    level: 12,
    xp: 12450,
    joinDate: "September 2025",
    location: "San Francisco, CA",
    bio: "Full-stack developer diving into Solana. Building the future of Web3, one block at a time.",
    socials: {
        twitter: "https://twitter.com/ryamparala",
        github: "https://github.com/ryamparala",
        discord: "ryamparala#1234",
    }
};

const SKILL_DATA_MOCK = [
    { subject: "Rust", A: 80, fullMark: 100 },
    { subject: "Solana", A: 65, fullMark: 100 },
    { subject: "TypeScript", A: 90, fullMark: 100 },
    { subject: "Anchor", A: 50, fullMark: 100 },
    { subject: "React", A: 85, fullMark: 100 },
    { subject: "Security", A: 40, fullMark: 100 },
];

const BADGES_MOCK = [
    { id: "1", name: "Early Adopter", description: "Joined during the beta phase", icon: "🚀", earned: true, earnedDate: "Sep 2025" },
    { id: "2", name: "Rustacean", description: "Completed Rust Fundamentals", icon: "🦀", earned: true, earnedDate: "Oct 2025" },
    { id: "3", name: "Solana Starter", description: "Deployed first program", icon: "☀️", earned: true, earnedDate: "Oct 2025" },
    { id: "4", name: "Bug Hunter", description: "Reported a critical bug", icon: "🐛", earned: false },
    { id: "5", name: "Community Hero", description: "Voted top contributor", icon: "🦸", earned: false },
    { id: "6", name: "DeFi Master", description: "Completed DeFi module", icon: "💸", earned: false },
    { id: "7", name: "NFT Creator", description: "Minted an NFT collection", icon: "🎨", earned: false },
    { id: "8", name: "Security Audit", description: "Passed security check", icon: "🔒", earned: false },
];

const CREDENTIALS_MOCK = [
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

export default function ProfilePage() {
    return (
        <div className="container mx-auto max-w-5xl py-8 px-4 space-y-12">
            {/* Header Section */}
            <ProfileHeader user={USER_MOCK} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Left Column: Stats & Radar */}
                <div className="space-y-8">
                    <SkillRadar data={SKILL_DATA_MOCK} />

                    <div className="bg-surface border border-border rounded-lg p-6">
                        <h3 className="text-lg font-bold text-text-primary mb-4">Current Streak</h3>
                        <div className="flex items-center justify-center py-4">
                            <div className="text-center">
                                <span className="text-4xl font-bold text-primary">12</span>
                                <span className="block text-sm text-text-secondary uppercase tracking-wider">Days</span>
                            </div>
                        </div>
                        <p className="text-center text-sm text-text-secondary">Keep learning to maintain your streak!</p>
                    </div>

                    <div className="bg-surface border border-border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-text-primary">Profile Visibility</h3>
                            <div className="w-12 h-6 bg-primary/20 rounded-full relative cursor-pointer border border-primary/30">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-primary rounded-full" />
                            </div>
                        </div>
                        <p className="text-sm text-text-secondary italic">Publicly visible to other builders.</p>
                    </div>
                </div>

                {/* Right Column: Badges & Credentials */}
                <div className="md:col-span-2 space-y-12">
                    {/* On-chain Credentials */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-text-primary">On-chain Credentials</h2>
                            <span className="text-sm text-primary font-mono select-none">evolving cNFTs</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {CREDENTIALS_MOCK.map((cred) => (
                                <CertificateThumb key={cred.id} {...cred} />
                            ))}
                        </div>
                    </section>

                    <BadgesGrid badges={BADGES_MOCK} />

                    {/* Completed Courses */}
                    <section>
                        <h2 className="text-2xl font-bold text-text-primary mb-6">Completed Courses</h2>
                        <div className="bg-surface border border-border rounded-lg divide-y divide-border">
                            {CREDENTIALS_MOCK.map((course) => (
                                <div key={course.id} className="p-4 flex items-center justify-between hover:bg-surface-2 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-primary">{course.courseTitle}</h4>
                                            <p className="text-xs text-text-secondary">Earned on Oct 24, 2025</p>
                                        </div>
                                    </div>
                                    <Link href={`/courses/solana-fundamentals`} className="text-sm text-primary hover:underline font-bold">Review</Link>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
