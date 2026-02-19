export class AuthService {
    static async getNonce(walletAddress: string): Promise<string> {
        const res = await fetch(`/api/auth/nonce?walletAddress=${walletAddress}`);
        if (!res.ok) throw new Error('Failed to get nonce');
        const { nonce } = await res.json();
        return nonce;
    }

    static async login(walletAddress: string, signature: string, message: string) {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress, signature, message })
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Login failed');
        }

        const { token, user } = await res.json();

        // Store JWT in localStorage or cookie
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_profile', JSON.stringify(user));

        return { token, user };
    }

    static logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_profile');
    }

    static getStoredToken() {
        return typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    }

    static getStoredUser() {
        if (typeof window === 'undefined') return null;
        const user = localStorage.getItem('user_profile');
        return user ? JSON.parse(user) : null;
    }
}
