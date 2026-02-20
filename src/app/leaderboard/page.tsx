import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Medal, Award } from "lucide-react";

import { Connection, PublicKey } from "@solana/web3.js";

async function getLeaderboardData() {
    try {
        const endpoint = process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com";
        const connection = new Connection(endpoint);
        const xpMint = new PublicKey(process.env.NEXT_PUBLIC_XP_MINT!);

        const largestAccounts = await connection.getTokenLargestAccounts(xpMint);

        if (!largestAccounts.value || largestAccounts.value.length === 0) {
            return [];
        }

        const topAccounts = largestAccounts.value.slice(0, 50);

        const results = await Promise.all(topAccounts.map(async (acc, index) => {
            let owner = "Unknown";
            try {
                const parsedInfo = await connection.getParsedAccountInfo(acc.address);
                // @ts-expect-error Web3.js ParsedAccountData typing is limited
                owner = parsedInfo.value?.data?.parsed?.info?.owner || "Unknown";
            } catch (e) {
                console.error("Failed to parse token account info", e);
            }

            return {
                rank: index + 1,
                user: {
                    name: `Learner`,
                    username: owner !== "Unknown" ? `${owner.slice(0, 4)}...${owner.slice(-4)}` : owner,
                    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${owner}`,
                },
                xp: acc.uiAmount || 0,
                level: Math.floor((acc.uiAmount || 0) / 100) + 1,
                badges: 0, // In full implementation, fetch from on-chain badges
                streak: 0, // In full implementation, fetch from profile
            };
        }));

        return results;
    } catch (error) {
        console.error("Failed to fetch leaderboard", error);
        return [];
    }
}

export const dynamic = 'force-dynamic';

export default async function LeaderboardPage() {
    const leaderboardData = await getLeaderboardData();

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
                            <TableHead>Top 50</TableHead>
                            <TableHead className="text-center">Level</TableHead>
                            <TableHead className="text-center hidden sm:table-cell">Badges</TableHead>
                            <TableHead className="text-center hidden sm:table-cell">Streak</TableHead>
                            <TableHead className="text-right">XP</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaderboardData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-text-secondary">
                                    No leaderboard data available yet. Start learning to earn XP!
                                </TableCell>
                            </TableRow>
                        ) : (
                            leaderboardData.map((entry) => (
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
                                        {entry.xp.toLocaleString()} XP
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
