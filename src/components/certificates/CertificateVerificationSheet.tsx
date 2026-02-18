"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, Check, Twitter, Share2 } from "lucide-react";
import { useState } from "react";

interface CertificateVerificationSheetProps {
    isOpen: boolean;
    onClose: () => void;
    mintAddress: string;
    courseTitle: string;
}

export function CertificateVerificationSheet({
    isOpen,
    onClose,
    mintAddress,
    courseTitle
}: CertificateVerificationSheetProps) {
    const [copied, setCopied] = useState(false);
    const explorerUrl = `https://explorer.solana.com/address/${mintAddress}?cluster=devnet`;
    const shareUrl = `${window.location.origin}/certificates/${mintAddress}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-xl bg-surface border-l border-border p-0 flex flex-col">
                <div className="p-6 border-b border-border">
                    <SheetHeader className="text-left">
                        <SheetTitle className="text-2xl font-bold text-text-primary flex items-center gap-2">
                            <Share2 className="w-6 h-6 text-primary" />
                            Verify Credential
                        </SheetTitle>
                        <SheetDescription className="text-text-secondary">
                            On-chain verification for <strong>{courseTitle}</strong>
                        </SheetDescription>
                    </SheetHeader>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Button
                            className="flex-1 bg-primary text-primary-foreground hover:opacity-90 font-bold"
                            onClick={handleCopy}
                        >
                            {copied ? (
                                <><Check className="w-4 h-4 mr-2" /> Copied!</>
                            ) : (
                                <><Copy className="w-4 h-4 mr-2" /> Copy Link</>
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1 border-border hover:border-primary hover:text-primary font-bold"
                            asChild
                        >
                            <a href={`https://twitter.com/intent/tweet?text=I just verified my ${courseTitle} certificate on Superteam Brazil Academy! 🚀&url=${shareUrl}`} target="_blank" rel="noopener noreferrer">
                                <Twitter className="w-4 h-4 mr-2" />
                                Share
                            </a>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-text-secondary hover:text-primary"
                            asChild
                        >
                            <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Solana Explorer Iframe */}
                <div className="flex-1 relative bg-surface-2 overflow-hidden">
                    <iframe
                        src={explorerUrl}
                        className="w-full h-full border-0"
                        title="Solana Explorer"
                    />

                    {/* Security Overlay for Iframe (prevents some interactions but lets users scroll) */}
                    <div className="absolute top-0 right-0 p-4 pointer-events-none">
                        <div className="bg-surface/80 backdrop-blur-sm border border-border px-3 py-1 rounded-full text-[10px] font-mono text-text-secondary">
                            LIVE EXPLORER VIEW
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
