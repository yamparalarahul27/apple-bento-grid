import { Terminal, ShieldCheck, Gamepad2, Globe } from "lucide-react";

const FEATURES = [
    {
        title: "Browser-Based IDE",
        description:
            "Write, compile, and deploy Solana programs directly from your browser. No local setup required.",
        icon: Terminal,
    },
    {
        title: "Verifiable Credentials",
        description:
            "Earn soulbound NFTs for every course you complete. Prove your skills on-chain to employers.",
        icon: ShieldCheck,
    },
    {
        title: "Gamified Learning",
        description:
            "Earn XP, maintain streaks, and climb the leaderboard. Learning Web3 doesn't have to be boring.",
        icon: Gamepad2,
    },
    {
        title: "Native Português",
        description:
            "Content designed first for Brazil. Learn in your native language with cultural context.",
        icon: Globe,
    },
];

export function FeatureHighlights() {
    return (
        <section className="py-20 md:py-24 bg-background relative">
            <div className="container px-4 md:px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-display-2 md:text-h1 font-bold text-text-primary mb-4">
                        Why Learn with <span className="text-primary">Us?</span>
                    </h2>
                    <p className="text-h4 text-text-secondary max-w-2xl mx-auto">
                        We combined the best of interactive learning with the power of the
                        Solana blockchain.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {FEATURES.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-surface-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-h4 font-bold text-text-primary mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-body-1 text-text-secondary">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
