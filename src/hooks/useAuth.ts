import { useEffect, useState, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { AuthService } from '@/services/auth.service';

interface AuthUser {
    id: string;
    walletAddress: string;
    displayName: string | null;
}

export function useAuth() {
    const { connected, publicKey, signMessage } = useWallet();
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = useCallback(async () => {
        if (!publicKey || !signMessage) return;

        try {
            setLoading(true);
            const walletAddress = publicKey.toBase58();

            // 1. Get Nonce
            const nonce = await AuthService.getNonce(walletAddress);

            // 2. Sign Message
            const messageEncoded = new TextEncoder().encode(nonce);
            const signature = await signMessage(messageEncoded);

            // 3. Login
            const signatureBase64 = Buffer.from(signature).toString('base64');
            const { user: loggedInUser } = await AuthService.login(walletAddress, signatureBase64, nonce);

            setUser(loggedInUser);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Auth login failed:', error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }, [publicKey, signMessage]);

    const logout = useCallback(() => {
        AuthService.logout();
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    useEffect(() => {
        const storedUser = AuthService.getStoredUser();
        const storedToken = AuthService.getStoredToken();

        if (storedUser && storedToken) {
            setUser(storedUser);
            setIsAuthenticated(true);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, []);

    // Auto-login when wallet connects but no session exists
    useEffect(() => {
        if (connected && !isAuthenticated && !loading) {
            // Check if stored user matches current wallet
            const storedUser = AuthService.getStoredUser();
            if (storedUser && storedUser.walletAddress === publicKey?.toBase58()) {
                setIsAuthenticated(true);
                setUser(storedUser);
            } else {
                // If no session or wallet changed, prompt login
                login();
            }
        }
    }, [connected, isAuthenticated, loading, publicKey, login]);

    return {
        user,
        loading,
        isAuthenticated,
        login,
        logout
    };
}
