export interface Track {
    id: string;
    label: string;
    active?: boolean;
}

export interface Lesson {
    id: string;
    title: string;
    duration: string;
    type: "video" | "article" | "quiz" | "challenge";
    content?: string;
}

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

export interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    accent: string;
    difficulty?: "Beginner" | "Intermediate" | "Advanced";
    duration?: string;
    modules?: Module[];
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

export const MOCK_COURSES: Course[] = [
    {
        id: "solana-fundamentals",
        title: "Solana Fundamentals",
        description: "Master the basics of Solana's architecture, accounts, and transactions.",
        thumbnail: "/thumbnails/solana-core.png",
        accent: "bg-purple-500",
        difficulty: "Beginner",
        duration: "40 Hours",
        modules: [
            {
                id: "mod-1",
                title: "Introduction to Blockchain",
                lessons: [
                    {
                        id: "l-1-1",
                        title: "What is Solana?",
                        duration: "10m",
                        type: "video",
                        content: `
# What is Solana?

Solana is a blockchain platform designed to host decentralized, scalable applications. Founded in 2017, it is an open-source project currently run by Solana Foundation Geneva, while the blockchain was built by Solana Labs San Francisco.

Solana is much faster in terms of the number of transactions it can process and has significantly lower transaction fees compared to rival blockchains like Ethereum.

## Key Concepts

### 1. Proof of History (PoH)
A sequence of computation that can provide a way to cryptographically verify passage of time between two events. It uses a cryptographically secure function written so that output cannot be predicted from the input, and must be completely executed to generate the output. 

### 2. Sealevel
The world's first parallel smart contracts run-time.

### 3. Tower BFT
A PoH-optimized version of PBFT.

## Why Build on Solana?

- **Fast**: 400ms block times.
- **Cheap**: $0.00025 avg fee per transaction.
- **Scalable**: 65,000+ TPS capacity.

## Your First Step
In this course, we will build a simple "Hello World" program on Solana using Rust and the Anchor Framework.

Right now, look at the editor on the right. This is **Solana Playground**, a browser-based IDE that lets you write, build, and deploy Solana programs without installing anything locally.
                        `
                    },
                    { id: "l-1-2", title: "Setup Local Environment", duration: "45m", type: "article", content: "# Setting up your Environment\n\nComing soon..." },
                    { id: "l-1-3", title: "Wallet Basics", duration: "15m", type: "quiz", content: "# Quiz: Wallet Basics\n\n1. What is a public key?\n2. What is a private key?" },
                ],
            },
            {
                id: "mod-2",
                title: "Accounts & Transactions",
                lessons: [
                    { id: "l-2-1", title: " The Account Model", duration: "25m", type: "video" },
                    { id: "l-2-2", title: "Rent & Storage", duration: "20m", type: "article" },
                    { id: "l-2-3", title: "Transaction Instructions", duration: "30m", type: "challenge" },
                ],
            },
            {
                id: "mod-3",
                title: "Programs (Smart Contracts)",
                lessons: [
                    { id: "l-3-1", title: "Hello World Program", duration: "45m", type: "video" },
                    { id: "l-3-2", title: "Deploying to Devnet", duration: "30m", type: "challenge" },
                ],
            },
        ],
    },
    {
        id: "rust-web3",
        title: "Rust for Web3",
        description: "Learn Rust from scratch for blockchain dev",
        thumbnail: "/thumbnails/rust.png",
        accent: "bg-orange-500",
        difficulty: "Intermediate",
        duration: "60 Hours",
    },
    {
        id: "anchor-cpi",
        title: "Anchor & CPI",
        description: "Deep dive into composable programs",
        thumbnail: "/thumbnails/anchor.png",
        accent: "bg-blue-500",
        difficulty: "Advanced",
        duration: "50 Hours",
    },
];

export const MOCK_TRENDING_COURSES = MOCK_COURSES;

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
