import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    const session = await getSession();
    return session?.user;
}

// For protecting API routes
export async function requireAuth() {
    const session = await getSession();
    if (!session) {
        throw new Error('Unauthorized');
    }

    return session;
}