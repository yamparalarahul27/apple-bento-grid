"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Twitter, Github, MessageSquare, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
    user: {
        name: string;
        username: string;
        avatar: string;
        level: number;
        xp: number;
        joinDate: string;
        location?: string;
        bio?: string;
        socials?: {
            twitter?: string;
            github?: string;
            discord?: string;
        };
    };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("mock_connected");
        // Dispatch storage event manually because 'storage' event only fires for other windows
        window.dispatchEvent(new Event("storage"));
        router.push("/");
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center p-8 bg-surface border border-border rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px] -mr-16 -mt-16 rounded-full group-hover:bg-primary/10 transition-colors" />

            <div className="absolute top-8 right-8 z-20">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-all font-bold text-sm"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>

            <Avatar className="w-28 h-28 border-4 border-background shadow-xl scale-100 hover:scale-105 transition-transform duration-300">
                <AvatarImage src={user.avatar || "/pf/pf 1.png"} alt={user.name} className="object-cover" />
                <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                    {user.name.charAt(0)}
                </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-text-primary tracking-tight">{user.name}</h1>
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-bold px-3">
                                Lvl {user.level}
                            </Badge>
                        </div>
                        <p className="text-primary font-mono text-sm">@{user.username}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {user.socials?.twitter && (
                            <Link href={user.socials.twitter} target="_blank" className="p-2 rounded-full bg-surface-2 border border-border hover:border-primary/50 hover:text-primary transition-all shadow-sm">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        )}
                        {user.socials?.github && (
                            <Link href={user.socials.github} target="_blank" className="p-2 rounded-full bg-surface-2 border border-border hover:border-primary/50 hover:text-primary transition-all shadow-sm">
                                <Github className="w-5 h-5" />
                            </Link>
                        )}
                        {user.socials?.discord && (
                            <div title={user.socials.discord} className="p-2 rounded-full bg-surface-2 border border-border hover:border-primary/50 hover:text-primary transition-all shadow-sm cursor-help relative group/discord">
                                <MessageSquare className="w-5 h-5" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-surface border border-border rounded text-[10px] whitespace-nowrap opacity-0 group-hover/discord:opacity-100 transition-opacity font-mono">
                                    {user.socials.discord}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {user.bio && (
                    <p className="text-text-secondary leading-relaxed max-w-2xl text-lg">
                        {user.bio}
                    </p>
                )}

                <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary pt-2">
                    <div className="flex items-center gap-2 bg-surface-2/50 px-3 py-1.5 rounded-full border border-border">
                        <CalendarDays className="w-4 h-4 text-primary" />
                        <span className="font-medium">Joined {user.joinDate}</span>
                    </div>
                    {user.location && (
                        <div className="flex items-center gap-2 bg-surface-2/50 px-3 py-1.5 rounded-full border border-border">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="font-medium">{user.location}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-center md:items-end justify-center gap-1 min-w-[140px] p-4 bg-primary/5 border border-primary/20 rounded-xl">
                <span className="text-xs text-text-secondary uppercase tracking-[0.2em] font-black opacity-60">Total XP</span>
                <span className="text-4xl font-black text-primary drop-shadow-[0_0_10px_rgba(20,241,149,0.3)]">{user.xp.toLocaleString()}</span>
            </div>
        </div>
    );
}
