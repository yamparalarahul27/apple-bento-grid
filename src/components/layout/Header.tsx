"use client";

import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WalletConnectButton } from "@/components/ui/WalletConnectButton";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./ThemeToggle";
import { SuccessModal } from "@/components/ui/SuccessModal";

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

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const pathname = usePathname();

    // Persist mock connection state
    React.useEffect(() => {
        const connected = localStorage.getItem("mock_connected") === "true";
        setIsConnected(connected);

        const handleStorageChange = () => {
            setIsConnected(localStorage.getItem("mock_connected") === "true");
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleConnect = () => {
        // Mock connection logic
        localStorage.setItem("mock_connected", "true");
        setShowSuccess(true);
        setIsConnected(true);
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("mock_connected");
        window.dispatchEvent(new Event("storage"));
        setIsConnected(false);
        window.location.href = "/";
    };

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
                    {isConnected ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="relative group outline-none">
                                <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden transition-all hover:scale-105 active:scale-95 group-hover:shadow-[0_0_15px_rgba(20,241,149,0.4)]">
                                    <Image
                                        src="/pf/pf 1.png"
                                        alt="User Profile"
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-surface animate-pulse" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-surface border-border p-2">
                                <DropdownMenuLabel className="text-text-primary px-2 py-1.5 font-bold">My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-border" />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="flex items-center gap-2 px-2 py-2 text-text-secondary hover:text-primary cursor-pointer focus:bg-surface-2">
                                        <User className="w-4 h-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings" className="flex items-center gap-2 px-2 py-2 text-text-secondary hover:text-primary cursor-pointer focus:bg-surface-2">
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-border" />
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-2 py-2 text-red-500 hover:text-red-600 cursor-pointer focus:bg-red-500/10"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <WalletConnectButton onClick={handleConnect} />
                    )}
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
                        <div className="pt-8 flex flex-col gap-4">
                            {isConnected ? (
                                <>
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-3 bg-surface-2 border border-border p-4 rounded-xl w-full"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
                                            <Image
                                                src="/pf/pf 1.png"
                                                alt="User Profile"
                                                width={48}
                                                height={48}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-text-primary">Rahul Yamparala</span>
                                            <span className="text-sm text-text-secondary">View Profile</span>
                                        </div>
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="flex items-center gap-3 bg-surface-2 border border-border p-4 rounded-xl w-full"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <Settings className="w-6 h-6" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-text-primary">Settings</span>
                                            <span className="text-sm text-text-secondary">Manage Account</span>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 p-4 rounded-xl w-full text-red-500 font-bold"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <WalletConnectButton onClick={handleConnect} />
                            )}
                        </div>
                    </div>
                </div>
            )}

            <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
        </header>
    );
}
