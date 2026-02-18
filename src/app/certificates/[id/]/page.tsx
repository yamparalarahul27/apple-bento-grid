"use client";

import { useParams } from "next/navigation";
import { CertificateCard } from "@/components/certificates/CertificateCard";
import { NFTDetails } from "@/components/certificates/NFTDetails";
import { CertificateActions } from "@/components/certificates/CertificateActions";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CertificatePage() {
    const params = useParams();
    const id = params.id as string;

    // Mock data for the dynamic certificate
    const mockCertificate = {
        courseTitle: "Solana Fundamentals",
        recipientName: "Rahul Yamparala",
        completionDate: "February 18, 2024",
        mintAddress: id || "7xWk3p...H9m2j",
        ownerAddress: "Gv6...N9p",
        courseTrack: "Solana Development",
        xpEarned: 1500,
        description: "Master the foundational concepts of the Solana blockchain. This comprehensive course covers Solana's unique architecture, including Proof of History, the Sealevel runtime, and the Gulf Stream transaction forwarding protocol. Students learn to navigate the Solana ecosystem, understand the account model, and prepare for smart contract development.",
        skills: [
            "Blockchain Architecture",
            "Solana Account Model",
            "Proof of History (PoH)",
            "Transaction Life Cycle",
            "Command Line Interface (CLI)",
            "Wallet Management"
        ],
        modules: [
            { title: "Introduction to Blockchain", duration: "45 mins" },
            { title: "Solana's High-Level Architecture", duration: "1.5 hours" },
            { title: "Deep Dive into Accounts & Programs", duration: "2 hours" },
            { title: "Transactions and Instructions", duration: "1.5 hours" },
            { title: "Final Assessment & Project", duration: "1 hour" }
        ]
    };

    return (
        <div className="min-h-screen bg-background text-text-primary">
            <div className="container max-w-7xl py-12 px-4 md:px-6">
                {/* Header/Navigation */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <Link
                            href="/profile"
                            className="inline-flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-primary transition-colors group"
                        >
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Profile
                        </Link>
                        <div>
                            <div className="flex items-center gap-3 text-primary mb-1">
                                <ShieldCheck className="w-6 h-6" />
                                <span className="text-sm font-bold uppercase tracking-widest">Verified Credential</span>
                            </div>
                            <h1 className="text-h2 font-bold text-text-primary">Course Certification</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-surface-2 border border-border rounded-full text-xs font-mono text-text-secondary">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        Verified on Solana Mainnet Beta
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Visual Certificate & Actions */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="space-y-6">
                            <CertificateCard
                                courseTitle={mockCertificate.courseTitle}
                                recipientName={mockCertificate.recipientName}
                                completionDate={mockCertificate.completionDate}
                                mintAddress={mockCertificate.mintAddress}
                            />

                            <div className="bg-surface border border-border rounded-2xl p-8">
                                <CertificateActions />
                            </div>
                        </div>

                        {/* Course Content Section */}
                        <div className="space-y-8">
                            <section className="space-y-4">
                                <h3 className="text-2xl font-bold border-b border-border pb-2">About this Course</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    {mockCertificate.description}
                                </p>
                            </section>

                            <section className="space-y-6">
                                <h3 className="text-2xl font-bold border-b border-border pb-2">Skills Verified</h3>
                                <div className="flex flex-wrap gap-2">
                                    {mockCertificate.skills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-2xl font-bold border-b border-border pb-2">Curriculum Breakdown</h3>
                                <div className="bg-surface border border-border rounded-xl overflow-hidden">
                                    {mockCertificate.modules.map((module, index) => (
                                        <div key={index} className="flex justify-between items-center p-4 border-b border-border last:border-b-0 hover:bg-surface-2 transition-colors">
                                            <span className="font-medium">{module.title}</span>
                                            <span className="text-xs text-text-secondary font-mono bg-surface-3 px-2 py-1 rounded">{module.duration}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Right Column: Technical Details */}
                    <div className="lg:col-span-4 space-y-8">
                        <NFTDetails
                            mintAddress={mockCertificate.mintAddress}
                            ownerAddress={mockCertificate.ownerAddress}
                            courseTrack={mockCertificate.courseTrack}
                            completionDate={mockCertificate.completionDate}
                            xpEarned={mockCertificate.xpEarned}
                        />

                        <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
                            <h4 className="font-bold text-text-primary">Validator Note</h4>
                            <p className="text-sm text-text-secondary italic">
                                "This certificate confirms that the holder has demonstrated exceptional understanding of Solana's core principles and passed all practical evaluations with a score of 90% or higher."
                            </p>
                            <div className="flex items-center gap-3 pt-4 border-t border-border">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Academic Board</p>
                                    <p className="text-xs text-text-secondary">Superteam Brazil</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
