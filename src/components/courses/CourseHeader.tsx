"use client";

import { Badge } from "@/components/ui/badge";
import { Clock, BarChart, Trophy, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Course } from "./CourseCard"; // Re-using interface
import { useLearningService } from "@/hooks/useLearningService";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { SuccessModal } from "@/components/ui/SuccessModal";


interface CourseHeaderProps {
    course: Course;
}

export function CourseHeader({ course }: CourseHeaderProps) {
    const { connected, publicKey } = useWallet();
    const learningService = useLearningService();

    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const checkEnrollment = async () => {
            if (connected && publicKey && learningService) {
                setCheckingStatus(true);
                try {
                    const progress = await learningService.getCourseProgress(publicKey, course.slug);
                    setIsEnrolled(!!progress);
                } catch (e) {
                    console.error("Failed to check enrollment:", e);
                } finally {
                    setCheckingStatus(false);
                }
            }
        };
        checkEnrollment();
    }, [connected, publicKey, learningService, course.slug]);

    const handleEnroll = async () => {
        if (!connected || !publicKey) {
            alert("Please connect your wallet first.");
            return;
        }
        if (!learningService) return;

        setLoading(true);
        try {
            const tx = await learningService.enroll(publicKey, course.slug);
            console.log("Enrolled!", tx);
            setIsEnrolled(true);
            setShowSuccess(true);
        } catch (error: any) {
            console.error("Enrollment error:", error);
            alert(`Enrollment failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-surface border-b border-border pb-12 pt-8">
            <div className="container px-4 md:px-6">
                <Link href="/courses" className="inline-flex items-center text-sm text-text-secondary hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Courses
                </Link>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Badge variant={course.difficulty === "Beginner" ? "default" : "secondary"}>
                                    {course.difficulty}
                                </Badge>
                                {isEnrolled && (
                                    <Badge variant="outline" className="border-primary text-primary">
                                        Enrolled
                                    </Badge>
                                )}
                            </div>
                            <h1 className="text-display-2 font-bold text-text-primary leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-h4 text-text-secondary max-w-2xl">
                                {course.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-6 text-body-2 text-text-secondary">
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BarChart className="h-5 w-5" />
                                <span>{course.modules} Modules</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-brand-yellow" />
                                <span>Earn Certificate</span>
                            </div>
                        </div>

                        <div className="pt-4">
                            {!connected ? (
                                <div className="p-4 bg-surface-2 rounded-lg border border-border inline-block">
                                    <p className="font-bold text-text-primary">Connect Wallet to Enroll</p>
                                    <p className="text-sm text-text-secondary">Use the button in the header to connect.</p>
                                </div>
                            ) : (
                                <>
                                    {isEnrolled ? (
                                        <button className="rounded-lg bg-surface-2 px-8 py-4 text-h4 font-bold text-text-primary border border-primary cursor-default">
                                            Continue Learning
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleEnroll}
                                            disabled={loading || checkingStatus}
                                            className="rounded-lg bg-primary px-8 py-4 text-h4 font-bold text-primary-foreground transition-all hover:bg-green-10 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {loading ? <Loader2 className="animate-spin" /> : null}
                                            {loading ? "Enrolling..." : "Enroll in Course"}
                                        </button>
                                    )}
                                </>
                            )}

                            <p className="mt-2 text-caption text-text-secondary">
                                * {connected ? "Ready to enroll on Devnet" : "Requires wallet connection"}
                            </p>
                        </div>
                    </div>

                    {/* Placeholder for Course Image/Preview - decorative for header */}
                    <div className="hidden lg:block w-1/3 aspect-video bg-surface-2 rounded-xl border border-border overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <span className="text-xs font-mono text-primary bg-surface/80 px-2 py-1 rounded">Course Preview</span>
                        </div>
                    </div>
                </div>
            </div>
            <SuccessModal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Enrollment Successful!"
                description={`You have successfully enrolled in ${course.title}. Good luck on your learning journey!`}
                buttonText="Start Learning"
            />
        </div>
    );
}
