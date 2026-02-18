import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { SkillRadar } from "@/components/profile/SkillRadar";
import { BadgesGrid } from "@/components/profile/BadgesGrid";
import { CertificatesList } from "@/components/profile/CertificatesList";

// Mock Data
const USER_MOCK = {
    name: "Rahul Yamparala",
    username: "ryamparala",
    avatar: "https://github.com/shadcn.png", // Placeholder
    level: 12,
    xp: 12450,
    joinDate: "September 2025",
    location: "San Francisco, CA",
    bio: "Full-stack developer diving into Solana. Building the future of Web3, one block at a time.",
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

const CERTIFICATES_MOCK = [
    {
        id: "cert-1",
        title: "Solana Certified Developer",
        issueDate: "November 15, 2025",
        issuer: "Superteam Academy",
        image: "/certificates/solana-dev.png",
    },
];

export default function ProfilePage() {
    return (
        <div className="container mx-auto max-w-5xl py-8 px-4 space-y-8">
            {/* Header Section */}
            <ProfileHeader user={USER_MOCK} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                </div>

                {/* Right Column: Badges & Certificates */}
                <div className="md:col-span-2 space-y-8">
                    <BadgesGrid badges={BADGES_MOCK} />
                    <CertificatesList certificates={CERTIFICATES_MOCK} />
                </div>
            </div>
        </div>
    );
}
