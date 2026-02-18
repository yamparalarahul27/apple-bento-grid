import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Medal, Award } from "lucide-react";

// Mock Data
const LEADERBOARD_MOCK = Array.from({ length: 20 }).map((_, i) => ({
    rank: i + 1,
    user: {
        name: `User ${i + 1}`,
        username: `user${i + 1}`,
        avatar: `https://i.pravatar.cc/150?u=${i}`,
    },
    xp: 15000 - (i * 500) + Math.floor(Math.random() * 200),
    level: 20 - Math.floor(i / 3),
    badges: Math.floor(Math.random() * 10),
    streak: Math.floor(Math.random() * 30),
}));

export default function LeaderboardPage() {
    return (
        <div className="container mx-auto max-w-4xl py-8 px-4 space-y-8">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
                <h1 className="text-display-2 font-bold text-text-primary flex items-center gap-3">
                    <Trophy className="w-10 h-10 text-yellow-400" />
                    Leaderboard
                </h1>
                <p className="text-text-secondary max-w-xl">
                    Top learners this week. Compete for XP, badges, and glory in the Solana Academy.
                </p>
            </div>

            <div className="bg-surface border border-border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader className="bg-surface-2">
                        <TableRow>
                            <TableHead className="w-[100px] text-center">Rank</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead className="text-center">Level</TableHead>
                            <TableHead className="text-center hidden sm:table-cell">Badges</TableHead>
                            <TableHead className="text-center hidden sm:table-cell">Streak</TableHead>
                            <TableHead className="text-right">XP</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {LEADERBOARD_MOCK.map((entry) => (
                            <TableRow key={entry.rank} className="hover:bg-surface-2/50 transition-colors">
                                <TableCell className="font-bold text-center">
                                    {entry.rank === 1 && <Trophy className="w-5 h-5 text-yellow-400 mx-auto" />}
                                    {entry.rank === 2 && <Medal className="w-5 h-5 text-gray-400 mx-auto" />}
                                    {entry.rank === 3 && <Medal className="w-5 h-5 text-amber-600 mx-auto" />}
                                    {entry.rank > 3 && <span className="text-text-secondary">#{entry.rank}</span>}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-8 h-8 border border-border">
                                            <AvatarImage src={entry.user.avatar} />
                                            <AvatarFallback>{entry.user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-text-primary">{entry.user.name}</span>
                                            <span className="text-xs text-text-secondary">@{entry.user.username}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge variant="secondary" className="bg-secondary/20 text-text-primary text-xs">
                                        Lvl {entry.level}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center hidden sm:table-cell">
                                    <div className="flex items-center justify-center gap-1 text-text-secondary">
                                        <Award className="w-4 h-4" />
                                        {entry.badges}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center hidden sm:table-cell">
                                    <span className="text-text-secondary">🔥 {entry.streak}</span>
                                </TableCell>
                                <TableCell className="text-right font-mono font-bold text-primary">
                                    {entry.xp.toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
