"use client";

import ReactConfetti from "react-confetti";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { useWindowSize } from "@/hooks/use-window-size"; // We might need this hook

interface CompletionModalProps {
    isOpen: boolean;
    onClose: () => void;
    nextLessonUrl?: string;
    xpEarned: number;
}

export function CompletionModal({ isOpen, onClose, nextLessonUrl, xpEarned }: CompletionModalProps) {
    const { width, height } = useWindowSize();

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {isOpen && <ReactConfetti width={width} height={height} recycle={false} numberOfPieces={500} />}

            <DialogContent className="sm:max-w-md bg-surface border-primary/20 text-center">
                {isOpen && <ReactConfetti width={width || 0} height={height || 0} recycle={false} numberOfPieces={500} />}

                <div className="flex flex-col items-center justify-center pt-6 space-y-4">
                    <div className="rounded-full bg-primary/10 p-6 animate-bounce-slow">
                        <Trophy className="w-12 h-12 text-primary" />
                    </div>

                    <DialogHeader>
                        <DialogTitle className="text-display-2 font-bold text-center">Lesson Complete!</DialogTitle>
                        <DialogDescription className="text-center text-body-1">
                            You've earned <span className="font-bold text-primary">+{xpEarned} XP</span> and are one step closer to mastering Solana.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col w-full gap-3 mt-4">
                        {nextLessonUrl ? (
                            <Button asChild className="w-full font-bold h-12 text-lg">
                                <Link href={nextLessonUrl}>
                                    Next Lesson <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                        ) : (
                            <Button onClick={onClose} className="w-full font-bold h-12 text-lg">
                                Return to Course
                            </Button>
                        )}

                        <Button variant="ghost" onClick={onClose} className="text-text-secondary">
                            Stay here
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
