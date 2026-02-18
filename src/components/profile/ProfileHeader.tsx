import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";

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
    };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center p-6 bg-surface border border-border rounded-lg">
            <Avatar className="w-24 h-24 border-4 border-background shadow-sm">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                    {user.name.charAt(0)}
                </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <h1 className="text-2xl font-bold text-text-primary">{user.name}</h1>
                    <Badge variant="secondary" className="w-fit bg-primary/10 text-primary hover:bg-primary/20">
                        Level {user.level}
                    </Badge>
                </div>

                <p className="text-text-secondary font-medium">@{user.username}</p>

                {user.bio && (
                    <p className="text-text-secondary max-w-2xl">{user.bio}</p>
                )}

                <div className="flex items-center gap-4 text-sm text-text-secondary pt-2">
                    <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        <span>Joined {user.joinDate}</span>
                    </div>
                    {user.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{user.location}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-end gap-1 min-w-[120px]">
                <span className="text-sm text-text-secondary uppercase tracking-wider font-semibold">Total XP</span>
                <span className="text-3xl font-bold text-primary">{user.xp.toLocaleString()}</span>
            </div>
        </div>
    );
}
