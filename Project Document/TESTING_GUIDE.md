# Testing Guide: Frontend On-Chain Integration

## Prerequisites
1.  **Browser Wallet**: Ensure you have the Solflare (or Phantom) extension installed.
2.  **Devnet Network**: Switch your wallet network to **Devnet**.
3.  **SOL Balance**: Ensure your wallet (`9rnp...5bmA`) has some Devnet SOL. 
    - If needed, visit [faucet.solana.com](https://faucet.solana.com/) to airdrop SOL.

## Step-by-Step Testing

### 1. Launch Application
The application should be running at:
[http://localhost:3000](http://localhost:3000)

### 2. Connect Wallet
1.  Click the "Select Wallet" button in the top navigation bar.
2.  Select **Solflare**.
3.  Approve the connection request in the pop-up.
4.  **Verify**: The button should display your truncated wallet address.

### 3. Enroll in a Course
1.  Navigate to the **Courses** page.
2.  Select a course (e.g., "Solana Fundamentals").
3.  Look for the **"Enroll in Course"** button.
4.  Click it. Your wallet will prompt you to approve a transaction.
5.  **Approve** the transaction.
6.  **Verify**: 
    - A success modal should appear.
    - The button should change to "Continue Learning".
    - An "Enrolled" badge should appear next to the difficulty level.

### 4. Complete a Lesson
1.  Click "Continue Learning" or navigate to a lesson within the course.
2.  Scroll to the bottom of the lesson content.
3.  Click **"Mark Complete"**.
4.  **Approve** the transaction in your wallet.
    - *Note: This transaction involves a backend co-signer (the "Teacher"). If this fails, it might be due to the backend environment setup, but we've verified the keypair file exists.*
5.  **Verify**:
    - A specific "Lesson Complete!" modal appears.
    - You receive XP (mock or real depending on current unimplemented logic).

## Troubleshooting

### Transaction Fails immediately
- **Error**: "AccountOrProgramNotFound" or "AccountNotInitialized"
- **Cause**: The frontend might be trying to interact with a course ID that doesn't exist on-chain.
- **Deep Dive**: In this implementation, the frontend uses mock data where the Course ID was `"1"`. However, the on-chain program was initialized with the course ID `"solana-fundamentals"` (the slug). When the frontend sent ID `"1"` to the program, the program couldn't find the corresponding Course Account (PDA), resulting in `AccountNotInitialized`.
- **Fix**: We updated the frontend (`CourseHeader.tsx`) to use `course.slug` instead of `course.id` for all on-chain interactions. We also ran a script `scripts/init_course.js` to ensure the "solana-fundamentals" course account is actually created on Devnet.

### Backend Verification Failures
- If the "Complete Lesson" step fails:
    - Check if `signer.json` exists in `../superteam-academy/wallets/`.
    - Ensure your wallet has Devnet SOL.
    - Check the terminal where `npm run dev` is running for API errors.

### Lesson Completion Error (0x1770 / 6000)
- **Error**: `AnchorError caused by account: learner_token_account. Error Code: Unauthorized. Error Number: 6000. Error Message: Unauthorized signer.`
- **Status**: **Known Issue (To Be Fixed)**
- **Cause**: The Anchor IDL (`web/src/lib/idl/onchain_academy.json`) for the `complete_lesson` instruction defines the `learner` account **without** the `"signer": true` attribute. 
    ```json
    {
      "name": "learner"
    },
    ```
    However, the on-chain program correctly requires the learner to sign the transaction to verify their identity. Since the IDL doesn't specify it, the frontend doesn't request a signature for this account, causing the program to reject the transaction with an "Unauthorized" error.
- **Resolution Plan**: Update the IDL to include `"signer": true` for the `learner` account in the `complete_lesson` instruction. This will ensure the wallet prompts the user to sign the transaction.

### Raw Error Log
```text
Simulation failed. 
Message: Transaction simulation failed: Error processing Instruction 2: custom program error: 0x1770. 
Logs: 
[
  "Program ComputeBudget111111111111111111111111111111 invoke [1]",
  "Program ComputeBudget111111111111111111111111111111 success",
  "Program ComputeBudget111111111111111111111111111111 invoke [1]",
  "Program ComputeBudget111111111111111111111111111111 success",
  "Program 8iSxN2Va5bJJzJDRsenGM3JVyuXtG8vwp5tZcYZ7cXAR invoke [1]",
  "Program log: Instruction: CompleteLesson",
  "Program log: AnchorError caused by account: learner_token_account. Error Code: Unauthorized. Error Number: 6000. Error Message: Unauthorized signer.",
  "Program 8iSxN2Va5bJJzJDRsenGM3JVyuXtG8vwp5tZcYZ7cXAR consumed 10232 of 199700 compute units",
  "Program 8iSxN2Va5bJJzJDRsenGM3JVyuXtG8vwp5tZcYZ7cXAR failed: custom program error: 0x1770"
]
```

### Deployment Error: Wallet Type Mismatch
- **Error Type**: Vercel Build Failure (TypeScript)
- **Error Message**: `Type error: Argument of type 'WalletContextState' is not assignable to parameter of type 'Wallet'.`
- **Location**: `src/hooks/useLearningService.ts` (likely around line 21)
- **Cause**: The `OnChainLearningProgressService` constructor expects an Anchor `Wallet` type, but is being passed the full `WalletContextState` from `@solana/wallet-adapter-react`. While they share some fields, they are technically incompatible because the wallet adapter's `signTransaction` can be `undefined` (if the wallet is not connected).
- **Status**: **Recorded (To Be Fixed if needed)**

### Prerender Error: PublicKey _bn of undefined
- **Error**: `TypeError: Cannot read properties of undefined (reading '_bn')` during `next build` on `/challenges`.
- **Cause**: Top-level `PublicKey` instantiation using environment variables (e.g., `process.env.NEXT_PUBLIC_PROGRAM_ID!`) in `OnChainLearningProgressService.ts`. During prerendering, if these variables are missing, the constructor crashes on import.
- **Fix**: Removed top-level unused `PROGRAM_ID` constant. Moved or gated any environment-variable-based `PublicKey` creation to ensure it only runs when the values are present.

