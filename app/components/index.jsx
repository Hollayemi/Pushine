'use client';
import { useAuth } from '@/hooks/useAuth';
import { signIn } from 'next-auth/react';

export default function AuthButton() {
    const { user, isAuthenticated, isLoading, logout } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return (
            <div className="flex items-center gap-4">
                <span>Welcome, {user?.name}</span>
                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Sign Out
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => signIn()}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
            Sign In
        </button>
    );
}