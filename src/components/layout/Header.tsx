"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WalletConnectButton } from "@/components/ui/WalletConnectButton";

const NAV_ITEMS = [
    { label: "Courses", href: "/courses" },
    { label: "Challenge", href: "/challenges" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Leaderboard", href: "/leaderboard" },
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 px-4 py-3 backdrop-blur-md md:px-8">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        className="h-8 md:h-8 lg:h-8 w-auto object-contain"
                        src="/Logo.png"
                        alt="Superteam Brazil Academy"
                        width={480}
                        height={200}
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-8 md:flex">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-body-1 font-bold transition-colors hover:text-primary ${isActive ? "text-primary" : "text-text-primary"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-4 md:flex">
                    <WalletConnectButton onClick={() => { }} />
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="flex items-center justify-center rounded-lg p-2 text-text-primary transition-colors hover:bg-surface-2 md:hidden"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 flex flex-col bg-surface p-4 md:hidden animate-in slide-in-from-right-full">
                    <div className="flex items-center justify-end">
                        <button
                            className="flex items-center justify-center rounded-lg p-2 text-text-primary transition-colors hover:bg-surface-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 pt-8">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`border-b border-border py-4 text-h4 font-bold transition-colors hover:text-primary ${isActive ? "text-primary" : "text-text-primary"
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                        <div className="pt-8 flex justify-center">
                            <WalletConnectButton onClick={() => setIsMenuOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
