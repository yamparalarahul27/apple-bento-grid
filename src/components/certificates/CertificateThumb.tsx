"use client";

import { ShieldCheck, CheckCircle2, Maximize2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { CertificateVerificationSheet } from "./CertificateVerificationSheet";

interface CertificateThumbProps {
    id: string;
    courseTitle: string;
    recipientName: string;
    completionDate: string;
}

export function CertificateThumb({ id, courseTitle, recipientName, completionDate }: CertificateThumbProps) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <>
            <div
                onClick={() => setIsSheetOpen(true)}
                className="group block cursor-pointer"
            >
                <div className="relative aspect-[1.4/1] bg-surface border border-border rounded-xl overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(20,241,149,0.15)] group-hover:-translate-y-1">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/20 rounded-tl-lg" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/20 rounded-br-lg" />

                    <div className="relative h-full flex flex-col items-center justify-between p-4 text-center">
                        <div className="flex items-center justify-between w-full opacity-60 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-primary" />
                                <span className="text-[10px] font-bold text-text-primary tracking-tight">Superteam Brazil Academy</span>
                            </div>
                            <Link
                                href={`/certificates/${id}`}
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                className="p-1 hover:bg-primary/10 rounded text-text-secondary hover:text-primary transition-colors"
                                title="View Full Page"
                            >
                                <Maximize2 className="w-3 h-3" />
                            </Link>
                        </div>

                        <div className="space-y-1">
                            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary">Certificate</p>
                            <h4 className="text-sm font-bold text-text-primary leading-tight px-2">{courseTitle}</h4>
                            <p className="text-[10px] text-text-secondary mt-1">{recipientName}</p>
                        </div>

                        <div className="w-full flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                            <span className="text-[8px] font-mono text-text-secondary uppercase">{completionDate}</span>
                            <div className="flex items-center gap-1 text-[8px] font-mono text-primary font-bold">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                VERIFIED
                            </div>
                        </div>
                    </div>

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors pointer-events-none" />
                </div>
            </div>

            <CertificateVerificationSheet
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                mintAddress={id}
                courseTitle={courseTitle}
            />
        </>
    );
}
