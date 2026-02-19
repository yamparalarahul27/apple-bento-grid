# Superteam Brazil Academy

Welcome to **Superteam Brazil Academy**, an on-chain education platform designed to onboard and certify builders in the Solana ecosystem. This repository contains the complete frontend and on-chain program code.

---

## 🚀 Project Overview

Superteam Brazil Academy provides a gamified learning experience where users:
- **Enroll** in developer tracks and courses.
- **Earn XP** for completing lessons and achievements.
- **Receive Certification** in the form of Soulbound (non-transferable) NFTs powered by **Metaplex Core**.
- **Build Reputation** through a transparent, on-chain curriculum.

## 🏗️ Architecture

The system consists of three main parts:
1.  **Frontend**: A modern, high-performance Next.js web application.
2.  **On-Chain Program**: An Anchor-based Solana program managing enrollments, XP, and credentials.
3.  **Backend Signer**: A secure service that co-signs transactions to verify lesson completions (anti-cheat).

Refer to [ARCHITECTURE.md](web/Project Document/ARCHITECTURE.md) for a detailed technical breakdown.

## 📂 Repository Structure

- `/web`: The Next.js frontend application.
- `/superteam-academy`: The Solana on-chain program (Anchor workspace).
- `/web/Project Document`: Technical specifications, integration guides, and deployment manuals.

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- Solana CLI & Anchor CLI (for program development)
- Rust (for program development)

### Frontend Setup
1. Move to the web directory: `cd web`
2. Install dependencies: `npm install`
3. Configure your environment: `cp .env.example .env.local`
4. Run locally: `npm run dev`

### Program Setup
Refer to the [DEPLOY-PROGRAM.md](web/Project Document/DEPLOY-PROGRAM.md) for detailed instructions on building and deploying your own instance to Devnet.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](web/LICENSE) file for details.
