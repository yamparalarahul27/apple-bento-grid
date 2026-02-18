"use client";

import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WalletConnectButton } from "@/components/ui/WalletConnectButton";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";

const NAV_ITEMS = [
    { label: "Courses", href: "/courses" },
    { label: "Challenge", href: "/challenges" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Leaderboard", href: "/leaderboard" },
];

const COURSES = [
    {
        title: "Solana Fundamentals",
        href: "/courses/solana-fundamentals",
        description: "Master the basics of blockchain and Solana's architecture.",
    },
    {
        title: "Rust for Solana",
        href: "/courses/rust-for-solana",
        description: "Learn Rust programming specifically for smart contracts.",
    },
    {
        title: "Anchor Framework",
        href: "/courses/anchor-framework",
        description: "Build secure and efficient programs using Anchor.",
    },
    {
        title: "Security & Auditing",
        href: "/courses/security-auditing",
        description: "Best practices for writing secure Solana programs.",
    },
];

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none text-text-primary">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-text-secondary">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/40 px-4 py-3 backdrop-blur-md md:px-8">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        className="h-8 md:h-8 lg:h-8 w-auto object-contain dark:block hidden"
                        src="/Logo.png"
                        alt="Superteam Brazil Academy"
                        width={480}
                        height={200}
                        priority
                    />
                    <Image
                        className="h-8 md:h-8 lg:h-8 w-auto object-contain block dark:hidden"
                        src="/Logo_light.png"
                        alt="Superteam Brazil Academy"
                        width={480}
                        height={200}
                        priority
                    />
                </Link>

                {/* Search Bar */}
                <div className="relative mx-auto hidden flex-1 px-8 md:block lg:max-w-md">
                    <Search className="absolute left-11 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
                    <Input
                        type="search"
                        placeholder="Search courses..."
                        className="w-full bg-surface-2 pl-9 text-body-1 focus-visible:ring-primary font-medium"
                    />
                </div>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-6 md:flex">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent !text-body-1 font-bold hover:text-primary hover:bg-transparent data-[state=open]:bg-transparent focus:bg-transparent px-0">
                                    Courses
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-surface border-border">
                                        {COURSES.map((course) => (
                                            <ListItem
                                                key={course.title}
                                                title={course.title}
                                                href={course.href}
                                                className="hover:bg-surface-2"
                                            >
                                                {course.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {NAV_ITEMS.filter(item => item.label !== "Courses").map((item) => {
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
                    <ThemeToggle />
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
