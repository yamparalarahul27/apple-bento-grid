export interface Track {
    id: string;
    label: string;
    active?: boolean;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    accent: string;
}

export interface Bootcamp {
    id: string;
    title: string;
    description: string;
    duration: string;
    level: string;
    startsIn: string;
}

export const MOCK_TRACKS: Track[] = [
    { id: "solana-fundamentals", label: "Solana Fundamentals", active: true },
    { id: "rust-programming", label: "Rust Programming" },
    { id: "anchor-framework", label: "Anchor Framework" },
    { id: "smart-contracts", label: "Smart Contracts" },
    { id: "token-programs", label: "Token Programs" },
    { id: "nfts-metaplex", label: "NFTs & Metaplex" },
    { id: "defi-solana", label: "DeFi on Solana" },
    { id: "web3-frontend", label: "Web3 Frontend" },
    { id: "security-audits", label: "Security & Audits" },
];

export const MOCK_TRENDING_COURSES: Course[] = [
    {
        id: "solana-core",
        title: "Solana Core",
        description: "Master the basics of Solana's architecture",
        thumbnail: "/thumbnails/solana-core.png", // We'll need standard placeholders
        accent: "bg-purple-500",
    },
    {
        id: "rust-web3",
        title: "Rust for Web3",
        description: "Learn Rust from scratch for blockchain dev",
        thumbnail: "/thumbnails/rust.png",
        accent: "bg-orange-500",
    },
    {
        id: "anchor-cpi",
        title: "Anchor & CPI",
        description: "Deep dive into composable programs",
        thumbnail: "/thumbnails/anchor.png",
        accent: "bg-blue-500",
    },
];

export const MOCK_BOOTCAMPS: Bootcamp[] = [
    {
        id: "bootcamp-1",
        title: "Solana Dev Bootcamp",
        description: "Build programs using Anchor & real dApps",
        duration: "8 weeks",
        level: "Beginner Friendly",
        startsIn: "10d",
    },
    {
        id: "bootcamp-2",
        title: "Rust for Solana",
        description: "Learn Rust from zero for on-chain dev",
        duration: "6 weeks",
        level: "Beginner Friendly",
        startsIn: "18d",
    },
    {
        id: "bootcamp-3",
        title: "DeFi on Solana",
        description: "AMMs, lending & protocols",
        duration: "10 weeks",
        level: "Intermediate",
        startsIn: "30d",
    },
];
