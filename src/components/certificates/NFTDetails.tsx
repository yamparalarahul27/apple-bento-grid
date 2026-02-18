"use client";

import { Card } from "@/components/ui/card";
import { ExternalLink, Hash, User, Calendar, Award, Database } from "lucide-react";

interface NFTDetailsProps {
    mintAddress: string;
    ownerAddress: string;
    courseTrack: string;
    completionDate: string;
    xpEarned: number;
}

export function NFTDetails({ mintAddress, ownerAddress, courseTrack, completionDate, xpEarned }: NFTDetailsProps) {
    const details = [
        { icon: Hash, label: "Mint Address", value: mintAddress, isMono: true, link: `https://explorer.solana.com/address/${mintAddress}?cluster=devnet` },
        { icon: User, label: "Owner", value: ownerAddress, isMono: true, link: `https://explorer.solana.com/address/${ownerAddress}?cluster=devnet` },
        { icon: Award, label: "Track", value: courseTrack },
        { icon: Calendar, label: "Issued At", value: completionDate },
        { icon: Database, label: "XP Awarded", value: `${xpEarned} XP` },
    ];

    return (
        <Card className="bg-surface border-border p-6 space-y-6">
            <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                NFT Credentials
            </h3>

            <div className="space-y-4">
                {details.map((detail, index) => (
                    <div key={index} className="space-y-1.5">
                        <div className="flex items-center gap-2 text-text-secondary">
                            <detail.icon className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold uppercase tracking-wider">{detail.label}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 p-2.5 bg-surface-2 border border-border rounded-lg group hover:border-primary/30 transition-colors">
                            <span className={`text-sm ${detail.isMono ? 'font-mono' : 'font-medium'} text-text-primary truncate`}>
                                {detail.value}
                            </span>
                            {detail.link && (
                                <a
                                    href={detail.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 hover:bg-primary/10 rounded-md text-text-secondary hover:text-primary transition-colors"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t border-border mt-6">
                <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl text-xs text-text-secondary leading-relaxed">
                    <Info className="w-4 h-4 text-primary shrink-0" />
                    This is a Soulbound Metaplex Core NFT representing your verified learning progress on Superteam Brazil Academy.
                </div>
            </div>
        </Card>
    );
}

import { Info, ShieldCheck } from "lucide-react";
