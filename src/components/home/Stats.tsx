import { Users, GraduationCap, Trophy, Code } from "lucide-react";

const STATS = [
    {
        label: "Developers Trained",
        value: "500+",
        icon: Users,
        color: "text-brand-yellow",
    },
    {
        label: "Lessons Completed",
        value: "10k+",
        icon: Code,
        color: "text-primary",
    },
    {
        label: "On-Chain Certificates",
        value: "100%",
        icon: GraduationCap,
        color: "text-blue-400", // Just a distinct visual
    },
    {
        label: "XP Earned",
        value: "1M+",
        icon: Trophy,
        color: "text-purple-400",
    },
];

export function Stats() {
    return (
        <section className="border-y border-border bg-surface/50 py-12">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {STATS.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center text-center"
                        >
                            <div
                                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 ${stat.color} bg-opacity-10`}
                            >
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <h3 className="text-h2 font-bold text-text-primary">
                                {stat.value}
                            </h3>
                            <p className="text-body-2 font-medium text-text-secondary">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
