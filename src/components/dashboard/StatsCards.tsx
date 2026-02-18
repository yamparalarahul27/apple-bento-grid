import { Trophy, Flame } from "lucide-react";

export function XPCard() {
    return (
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-h4 font-bold text-text-primary">Current Level</h3>
                <Trophy className="h-5 w-5 text-brand-yellow" />
            </div>

            <div className="flex items-end gap-2 mb-2">
                <span className="text-display-2 font-bold text-text-primary leading-none">3</span>
                <span className="text-h4 font-medium text-text-secondary mb-1">Apprentice</span>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-caption text-text-secondary">
                    <span>850 XP</span>
                    <span>1,200 XP to Level 4</span>
                </div>
                <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-yellow w-[70%]" />
                </div>
            </div>
        </div>
    );
}

export function StreakCard() {
    return (
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-h4 font-bold text-text-primary">Daily Streak</h3>
                <Flame className="h-5 w-5 text-red-500" />
            </div>

            <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    <span className="text-display-2 font-bold text-text-primary leading-none">12</span>
                    <span className="text-body-2 text-text-secondary">Days Active</span>
                </div>

                {/* Mini Heatmap Visualization (Static Mock) */}
                <div className="flex gap-1">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className={`h-8 w-2 rounded-sm ${i > 2 ? 'bg-primary' : 'bg-surface-2'}`} />
                    ))}
                </div>
            </div>
            <p className="mt-4 text-caption text-text-secondary">
                You're on fire! Complete a lesson today to keep your streak alive.
            </p>
        </div>
    );
}
