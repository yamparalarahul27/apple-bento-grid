"use client";

import { Button } from "@/components/ui/button";
import { MoveRight, User, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProjectOnHoldOverlayProps {
    onExplore: () => void;
}

export function ProjectOnHoldOverlay({ onExplore }: ProjectOnHoldOverlayProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl">
            <div className="flex flex-col items-center justify-center p-6 text-center w-full min-h-screen">
                <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-primary">
                            Project on Hold
                        </h1>
                        <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                            Project is on Hold, as priority is changed. <br className="hidden md:block" />
                            This project was started as part of a
                            <br />
                            bounty by Superteam Brazil
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link href="https://yamparalaux.vercel.app" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto group bg-primary hover:bg-green-10 text-white font-bold h-12 px-8 rounded-none shadow-lg shadow-primary/20 transition-all hover:scale-105">
                                <User className="mr-2 h-5 w-5" />
                                View Builder
                            </Button>
                        </Link>

                        <Button
                            variant="outline"
                            size="lg"
                            onClick={onExplore}
                            className="w-full sm:w-auto border-border bg-surface hover:bg-surface-2 text-text-primary h-12 px-8 rounded-none transition-all hover:scale-105"
                        >
                            <Eye className="mr-2 h-5 w-5" />
                            Continue
                            <MoveRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    <div className="pt-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-2 border border-border text-sm font-medium text-text-secondary">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Waiting for Priority Update
                        </div>
                    </div>
                </div>

                {/* Background Decorative Elements */}
                <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
                </div>
            </div>
        </div>
    );
}
