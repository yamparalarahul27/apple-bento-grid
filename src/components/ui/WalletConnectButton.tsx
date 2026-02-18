import { Wallet } from "lucide-react";

interface WalletConnectButtonProps {
    onClick?: () => void;
}

export function WalletConnectButton({ onClick }: WalletConnectButtonProps) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-button font-bold text-primary-foreground transition-colors hover:bg-green-10 hover:shadow-lg active:scale-95"
        >
            <Wallet className="h-4 w-4" />
            <span>Select Wallet</span>
        </button>
    );
}
