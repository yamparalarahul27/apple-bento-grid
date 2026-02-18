"use client";

import Link from "next/link";
import { MoveLeft, Home, BookOpen, LayoutDashboard, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px] animate-pulse delay-700" />
            </div>

            <div className="relative z-10 max-w-2xl w-full text-center space-y-12">
                {/* 404 Visual */}
                <div className="relative">
                    <h1 className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary/50 to-transparent opacity-20 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="space-y-2">
                            <div className="flex items-center justify-center gap-4 text-primary mb-4">
                                <Search className="w-12 h-12" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
                                Lost in the Block?
                            </h2>
                            <p className="text-lg text-text-secondary max-w-md mx-auto">
                                The page you are looking for has been pruned from the state or never existed.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button asChild variant="outline" className="h-16 bg-surface-2 border-border hover:border-primary hover:text-primary transition-all group">
                        <Link href="/">
                            <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                            Return Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-16 bg-surface-2 border-border hover:border-primary hover:text-primary transition-all group">
                        <Link href="/courses">
                            <BookOpen className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                            Browse Courses
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-16 bg-surface-2 border-border hover:border-primary hover:text-primary transition-all group">
                        <Link href="/dashboard">
                            <LayoutDashboard className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                            Dashboard
                        </Link>
                    </Button>
                </div>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-bold text-text-secondary hover:text-primary transition-colors group"
                    >
                        <MoveLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Go back to safety
                    </Link>
                </div>
            </div>

            {/* Subtle Overlay Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
    );
}
