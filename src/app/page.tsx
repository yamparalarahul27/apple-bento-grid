import {
  ArrowRight,
  Code2,
  Flame,
  Globe2,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import Link from "next/link";

const featureCards = [
  {
    title: "Interactive courses",
    description: "Project-based modules with live code runners and instant feedback.",
    icon: <Code2 className="h-5 w-5" />,
  },
  {
    title: "On-chain credentials",
    description: "Earn evolving cNFTs and soulbound XP as you ship.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Community-powered",
    description: "Built with Superteam Brazil for Solana devs across LATAM.",
    icon: <Globe2 className="h-5 w-5" />,
  },
];

const paths = [
  {
    title: "Solana Fundamentals",
    meta: "Beginner · 6h · +400 XP",
    progress: 35,
  },
  {
    title: "Anchor & Program Dev",
    meta: "Intermediate · 10h · +850 XP",
    progress: 10,
  },
  {
    title: "DeFi Builder Track",
    meta: "Advanced · 14h · +1,200 XP",
    progress: 0,
  },
];

const stats = [
  { label: "Builders enrolled", value: "12.4k" },
  { label: "XP minted", value: "8.1M" },
  { label: "Credentials issued", value: "3.7k" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white/70 via-white to-white/60 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-10 sm:px-10">
        {/* Top bar */}
        <header className="flex items-center justify-between rounded-full border border-slate-200/70 bg-white/80 px-5 py-3 shadow-card-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium text-slate-500">Superteam Brazil</p>
              <p className="text-base font-semibold">Solana Academy</p>
            </div>
          </div>
          <div className="hidden items-center gap-4 text-sm font-medium text-slate-600 sm:flex">
            <Link href="#courses" className="hover:text-slate-900">
              Courses
            </Link>
            <Link href="#paths" className="hover:text-slate-900">
              Learning Paths
            </Link>
            <Link href="#challenge" className="hover:text-slate-900">
              Playground
            </Link>
            <Link href="#credentials" className="hover:text-slate-900">
              Credentials
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900 sm:inline-flex">
              Explore courses
            </button>
            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:shadow-blue-500/40">
              Connect wallet
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
              <Flame className="h-4 w-4 text-orange-500" />
              Solana-native learning, from zero to mainnet
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Build production-ready dApps with an open, on-chain academy.
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              Interactive courses, code challenges, wallet auth, and evolving credentials—all designed for Solana developers across Brazil and LATAM.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:shadow-blue-500/40">
                Start free track
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-300">
                View course catalog
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 shadow-card-sm"
                >
                  <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
                  <p className="text-sm text-slate-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-card-sm backdrop-blur" id="challenge">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/10" />
            <div className="relative flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                    Live challenge
                  </p>
                  <p className="text-lg font-semibold text-slate-900">Anchor escrow program</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  +100 XP
                </span>
              </div>
              <div className="rounded-2xl bg-slate-900 p-4 text-slate-100">
                <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-blue-200">
                  <Code2 className="h-4 w-4" /> playground
                </div>
                <pre className="whitespace-pre-wrap text-sm leading-relaxed text-slate-100/90">
                  {`#[derive(Accounts)]
pub struct InitEscrow<'info> {
  #[account(init, payer = user, space = 8 + Escrow::LEN)]
  pub escrow: Account<'info, Escrow>,
  #[account(mut)]
  pub user: Signer<'info>,
  pub system_program: Program<'info, System>,
}
`}
                </pre>
                <div className="mt-3 flex items-center gap-2 text-xs text-blue-100">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" /> Tests passing
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/30">
                  Continue challenge
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800">
                  View hints
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section id="courses" className="grid gap-5 sm:grid-cols-3">
          {featureCards.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-card-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Learning paths */}
        <section id="paths" className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Learning paths</p>
            <h2 className="text-3xl font-semibold text-slate-900">Pick your journey</h2>
            <p className="text-slate-600">
              Beginner to advanced tracks with XP rewards, checkpoints, and evolving credentials for each track.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {paths.map((path) => (
              <div
                key={path.title}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-card-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{path.title}</h3>
                    <p className="text-sm text-slate-600">{path.meta}</p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    +XP
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                    style={{ width: `${path.progress}%` }}
                  />
                </div>
                <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-300">
                  Continue path
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Credentials & social proof */}
        <section
          id="credentials"
          className="grid gap-8 rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-card-sm lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Credentials</p>
            <h2 className="text-3xl font-semibold text-slate-900">Earn evolving cNFTs as you level up.</h2>
            <p className="text-slate-600">
              Each track mints a compressed NFT that upgrades with your progress. XP is soulbound—your balance proves your level across the ecosystem.
            </p>
            <div className="flex flex-col gap-3 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" /> On-chain verification via Solana Explorer
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" /> Wallet linking required to finalize credentials
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-indigo-500" /> Close enrollments to reclaim rent after completion
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/30">
                View credential demo
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800">
                Read program spec
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-6 text-white">
            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
              <Trophy className="h-4 w-4 text-amber-300" /> Level 12
            </div>
            <div className="relative flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                Credential · cNFT
              </p>
              <h3 className="text-2xl font-semibold">Solana DeFi Track</h3>
              <p className="text-sm text-slate-200">
                Evolves as you complete modules. Metadata proves your progress on-chain.
              </p>
              <div className="flex gap-3 text-xs text-slate-200">
                <span className="rounded-full bg-white/10 px-3 py-1">XP: 3,200</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Achievements: 12/256</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Streak: 18 days</span>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-slate-200">
                <div className="h-2 w-2 rounded-full bg-emerald-400" /> On-chain verified
              </div>
              <div className="mt-2 flex items-center gap-3 text-xs text-slate-200">
                <div className="h-2 w-2 rounded-full bg-amber-300" /> Social share ready
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-card-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.15),transparent_25%)]" />
          <div className="relative grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">Built for Solana devs</p>
              <h2 className="text-3xl font-semibold leading-tight">Launch your Solana career with Superteam Academy.</h2>
              <p className="text-blue-100">
                Join thousands of builders leveling up with interactive lessons, live code challenges, and verifiable credentials on Solana.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700">
                  Get started free
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-white/60 px-5 py-3 text-sm font-semibold text-white">
                  Join Discord
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl bg-white/10 p-4 text-sm text-blue-50 ring-1 ring-white/20">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Next cohort</span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs">Mar 2026</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Live workshops</span>
                <span className="font-semibold">Weekly</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Mentors</span>
                <span className="font-semibold">Superteam Brazil</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Languages</span>
                <span className="font-semibold">PT-BR · ES · EN</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
