import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { LearningProgressService } from "@/services/learning-progress.service";
import { OnChainLearningProgressService } from "@/services/on-chain-learning.service";
import { localLearningService } from "@/services/local-learning.service";

export function useLearningService() {
    const { connection } = useConnection();
    const wallet = useWallet();

    const service: LearningProgressService | null = useMemo(() => {
        // Switch to local service if configured or fallback
        if (process.env.NEXT_PUBLIC_USE_LOCAL_SERVICE === 'true') {
            return localLearningService;
        }

        if (!wallet || !wallet.publicKey) {
            return null;
        }

        return new OnChainLearningProgressService(connection, wallet);
    }, [connection, wallet]);

    return service;
}
