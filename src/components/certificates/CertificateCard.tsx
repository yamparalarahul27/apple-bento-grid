"use client";

import Image from "next/image";
import { CheckCircle2, ShieldCheck, Search } from "lucide-react";
import { useState } from "react";
import { CertificateVerificationSheet } from "./CertificateVerificationSheet";

interface CertificateCardProps {
    courseTitle: string;
    recipientName: string;
    completionDate: string;
    mintAddress: string;
}

export function CertificateCard({ courseTitle, recipientName, completionDate, mintAddress }: CertificateCardProps) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <>
            <div className="relative w-full aspect-[1.4/1] rounded-2xl overflow-hidden shadow-2xl group">
                {/* Background with animated gradients */}
                <div className="absolute inset-0 bg-surface border-4 border-primary/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-50" />

                {/* Corner Patterns */}
                <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-primary/20 rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-primary/20 rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b-8 border-l-8 border-primary/20 rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-primary/20 rounded-br-xl" />

                {/* Content Container */}
                <div className="relative h-full flex flex-col items-center justify-between py-12 px-8 text-center">
                    {/* Header Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-xl shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-xl font-bold text-text-primary tracking-tight">Superteam Brazil Academy</span>
                    </div>

                    {/* Main Text */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Certificate of Excellence</p>
                            <h2 className="text-4xl md:text-5xl font-bold text-text-primary">Achievement Unlocked</h2>
                        </div>

                        <div className="py-2">
                            <p className="text-lg text-text-secondary">This is to certify that</p>
                            <p className="text-3xl font-bold text-text-primary mt-2">{recipientName}</p>
                        </div>

                        <div className="max-w-md mx-auto">
                            <p className="text-text-secondary">has successfully mastered the complex concepts of</p>
                            <p className="text-2xl font-bold text-primary mt-2">{courseTitle}</p>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="w-full flex items-end justify-between px-8">
                        <div className="text-left space-y-1">
                            <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Issue Date</p>
                            <p className="text-sm font-bold text-text-primary">{completionDate}</p>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <button
                                onClick={() => setIsSheetOpen(true)}
                                className="w-16 h-16 rounded-lg bg-white p-1 shadow-md hover:scale-110 transition-transform cursor-pointer group/qr"
                            >
                                {/* Mock QR Code */}
                                <div className="w-full h-full bg-surface border border-border flex items-center justify-center relative overflow-hidden">
                                    <span className="text-[10px] font-mono text-text-secondary uppercase leading-none group-hover/qr:opacity-0 transition-opacity">Verified<br />on Solana</span>
                                    <div className="absolute inset-0 flex items-center justify-center bg-primary translate-y-full group-hover/qr:translate-y-0 transition-transform">
                                        <Search className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                </div>
                            </button>
                            <div className="flex items-center gap-1 text-[10px] font-mono text-primary font-bold">
                                <CheckCircle2 className="w-3 h-3" />
                                SOLANA CERTIFIED
                            </div>
                        </div>

                        <div className="text-right space-y-1">
                            <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">NFT Proof</p>
                            <p className="text-xs font-mono font-bold text-text-primary">{mintAddress.slice(0, 4)}...{mintAddress.slice(-4)}</p>
                        </div>
                    </div>
                </div>

                {/* Overlays for premium look */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-surface via-transparent to-transparent opacity-30" />
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />
            </div>

            <CertificateVerificationSheet
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                mintAddress={mintAddress}
                courseTitle={courseTitle}
            />
        </>
    );
}
