import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

interface BadgeItem {
    id: string;
    name: string;
    description: string;
    icon: string; // Emoji or image URL
    earned: boolean;
    earnedDate?: string;
}

interface BadgesGridProps {
    badges: BadgeItem[];
}

export function BadgesGrid({ badges }: BadgesGridProps) {
    return (
        <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-text-primary">Badges</h3>
                <Badge variant="outline" className="text-text-secondary border-border">
                    {badges.filter(b => b.earned).length} / {badges.length} Earned
                </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {badges.map((badge) => (
                    <div
                        key={badge.id}
                        className={`
              relative group flex flex-col items-center justify-center p-4 rounded-lg border transition-all
              ${badge.earned
                                ? 'bg-surface-2 border-primary/20 hover:border-primary/50'
                                : 'bg-surface border-border opacity-60 grayscale'
                            }
            `}
                    >
                        <div className="text-4xl mb-3 filter drop-shadow-sm">
                            {badge.icon}
                        </div>

                        <h4 className="text-sm font-semibold text-center text-text-primary mb-1">
                            {badge.name}
                        </h4>

                        {badge.earned && badge.earnedDate && (
                            <span className="text-[10px] text-text-secondary">
                                {badge.earnedDate}
                            </span>
                        )}

                        {!badge.earned && (
                            <div className="absolute top-2 right-2 text-text-secondary opacity-50">
                                <Lock className="w-3 h-3" />
                            </div>
                        )}

                        {/* Tooltip on hover */}
                        <div className="absolute inset-x-0 bottom-full mb-2 hidden group-hover:block z-10">
                            <div className="bg-popover text-popover-foreground text-xs p-2 rounded shadow-lg border border-border text-center mx-auto w-max max-w-[150px]">
                                {badge.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
