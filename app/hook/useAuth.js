// hooks/useAuth.js - Custom hook for client-side auth
'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useAuth() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const logout = async () => {
        await signOut({
            redirect: false
        });
        router.push('/');
    };

    return {
        user: session?.user,
        session,
        isLoading: status === 'loading',
        isAuthenticated: !!session,
        logout
    };
}
