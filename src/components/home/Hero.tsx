import Link from "next/link";
import { ArrowRight, Code2, Rocket } from "lucide-react";
import { WalletConnectButton } from "@/components/ui/WalletConnectButton";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] bg-green-9/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] bg-brand-yellow/5 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/4" />

            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center rounded-full border border-green-5 bg-green-2 px-3 py-1 text-sm font-medium text-green-11 mb-6">
                        <Rocket className="mr-2 h-4 w-4" />
                        <span>Launch your Web3 Career in Brazil</span>
                    </div>

                    <h1 className="text-display-2 md:text-display-1 font-bold tracking-tight text-text-primary max-w-4xl mb-6">
                        Master <span className="text-primary">Solana</span> Development
                    </h1>

                    <p className="text-h4 md:text-h3 text-text-secondary max-w-2xl mb-10 font-normal">
                        Interactive courses, real-time code challenges, and on-chain
                        credentials. Built by Superteam Brazil for the next generation of
                        builders.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link
                            href="/courses"
                            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-body-1 font-bold text-primary-foreground transition-all hover:bg-green-10 hover:shadow-lg active:scale-95"
                        >
                            Start Learning
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            href="/courses"
                            className="inline-flex items-center justify-center rounded-lg border-2 border-border bg-transparent px-8 py-4 text-body-1 font-bold text-text-primary transition-all hover:bg-surface hover:border-primary/50 active:scale-95"
                        >
                            <Code2 className="mr-2 h-5 w-5" />
                            Explore Curriculum
                        </Link>
                    </div>

                    {/* Code Preview / Visual Placeholder */}
                    <div className="mt-16 w-full max-w-5xl rounded-xl border border-border bg-surface shadow-2xl overflow-hidden aspect-video relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <span className="text-h4 font-bold text-text-secondary">Interactive Code Browser Placeholder</span>
                        </div>
                        {/* We can replace this with a real image later */}
                        <div className="grid grid-cols-12 h-full opacity-20 group-hover:opacity-30 transition-opacity">
                            <div className="col-span-4 border-r border-border bg-surface-2 p-4 font-mono text-xs text-text-secondary">
                                sidebar...
                            </div>
                            <div className="col-span-8 p-4 font-mono text-xs text-green-11">
                                function main() &#123; ... &#125;
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
