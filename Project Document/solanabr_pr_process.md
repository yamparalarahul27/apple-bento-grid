# Pull Request Process — Superteam Academy

This document outlines the workflow for developing in a private repository and eventually merging your work into the main [solanabr/superteam-academy](https://github.com/solanabr/superteam-academy) repository.

## Current Phase: Private Development
To protect your configurations, deployment details, and experimental code, we are using a separate **private** repository for the `superteam-academy` program part.

- **Private Repo**: [Your New Private Repo URL]
- **Purpose**: Stable development, on-chain testing, and keeping private keys (`wallets/`) secure.

---

## Final Phase: Merging with Main Repo
When your work is complete and meets the requirements, follow these steps to submit your Pull Request to the original repository.

### 1. Fork the Original Repository
Visit [solanabr/superteam-academy](https://github.com/solanabr/superteam-academy) on GitHub and click the **Fork** button.

### 2. Add the Fork as a Remote
In your local terminal, within the `superteam-academy` folder, add your fork as a new remote:
```bash
git remote add submission https://github.com/your-username/superteam-academy.git
```

### 3. Sync and Prepare
Ensure your code is clean and based on the latest main branch:
```bash
git checkout -b feature/your-awesome-feature
```

### 4. Push to Your Fork
Push your final, clean code to your fork:
```bash
git push submission feature/your-awesome-feature
```

### 5. Create the Pull Request
1. Go to **your fork** on GitHub.
2. Click **Compare & pull request**.
3. Ensure the base repository is `solanabr/superteam-academy` and the base branch is `main`.
4. Describe your changes and link any required documentation.

---

> [!IMPORTANT]
> **Never commit your private keys!**
> Before merging, ensure the `wallets/` folder is correctly ignored by yours `.gitignore`. Your submission should contain the code logic, not your deployment secrets.
