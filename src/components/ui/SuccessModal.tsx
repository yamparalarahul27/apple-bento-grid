"use client";

import { CheckCircle2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ReactConfetti from "react-confetti";
import { useEffect, useState } from "react";

/**
 * Properties for the SuccessModal component.
 * @interface SuccessModalProps
 * @property {boolean} isOpen - Controls the visibility of the modal.
 * @property {() => void} onClose - Callback function to fire when the modal is dismissed.
 */
export interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    buttonText?: string;
}

export function SuccessModal({
    isOpen,
    onClose,
    title = "Wallet Connected!",
    description = "Your wallet has been successfully linked to Superteam Brazil Academy. You're ready to start your journey.",
    buttonText = "Let's Build"
}: SuccessModalProps) {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md bg-surface border-border text-center flex flex-col items-center py-10">
                {isOpen && (
                    <ReactConfetti
                        width={windowSize.width}
                        height={windowSize.height}
                        recycle={false}
                        numberOfPieces={200}
                        style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }}
                    />
                )}
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-in zoom-in duration-300">
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-2xl font-bold text-text-primary text-center">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-text-secondary text-center text-base">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-8 w-full">
                    <Button
                        onClick={onClose}
                        className="w-full bg-primary text-primary-foreground hover:bg-green-10 font-bold py-6 text-lg"
                    >
                        {buttonText}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
