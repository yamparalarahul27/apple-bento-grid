import Image from "next/image";
import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";

const FOOTER_LINKS = [
    {
        title: "Platform",
        links: [
            { label: "Courses", href: "/courses" },
            { label: "Challenges", href: "/challenges" },
            { label: "Leaderboard", href: "/leaderboard" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Documentation", href: "/docs" },
            { label: "Community", href: "/community" },
            { label: "Help Center", href: "/help" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Terms of Service", href: "/terms" },
            { label: "Privacy Policy", href: "/privacy" },
        ],
    },
];

export function Footer() {
    return (
        <footer className="w-full border-t border-border bg-surface py-12 md:py-16">
            <div className="container px-4 md:px-6">
                <div className="grid gap-8 lg:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/Logo.png"
                                alt="Superteam Brazil Academy"
                                width={200}
                                height={80}
                                className="h-12 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-body-2 text-text-secondary max-w-xs">
                            Empowering the next generation of Solana developers in Brazil with
                            interactive learning and on-chain credentials.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="https://twitter.com/SuperteamBR"
                                target="_blank"
                                rel="noreferrer"
                                className="text-text-secondary transition-colors hover:text-primary"
                            >
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                href="https://github.com/SuperteamBR"
                                target="_blank"
                                rel="noreferrer"
                                className="text-text-secondary transition-colors hover:text-primary"
                            >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-text-secondary transition-colors hover:text-primary"
                            >
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>

                    {FOOTER_LINKS.map((section) => (
                        <div key={section.title} className="flex flex-col gap-4">
                            <h4 className="text-h4 font-bold text-text-primary">
                                {section.title}
                            </h4>
                            <ul className="flex flex-col gap-2">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-body-2 text-text-secondary transition-colors hover:text-primary"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 border-t border-border pt-8 text-center md:text-left">
                    <p className="text-caption text-text-secondary">
                        © {new Date().getFullYear()} Superteam Brazil Academy. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
