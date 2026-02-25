import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAuth = !!token;
        const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
        const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');

        // If user is on auth page and already authenticated, redirect to dashboard
        if (isAuthPage && isAuth) {
            const callbackUrl = req.nextUrl.searchParams.get('callbackUrl') || '/dashboard';
            return NextResponse.redirect(new URL(callbackUrl, req.url));
        }

        // If user is trying to access dashboard without auth, redirect to auth
        if (isDashboard && !isAuth) {
            const signInUrl = new URL('/auth', req.url);
            signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
            return NextResponse.redirect(signInUrl);
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Allow access to auth page
                if (req.nextUrl.pathname.startsWith('/auth')) {
                    return true;
                }

                // Require auth for dashboard
                if (req.nextUrl.pathname.startsWith('/dashboard')) {
                    return !!token;
                }

                // Allow all other routes
                return true;
            },
        },
        pages: {
            signIn: '/auth',
        },
    }
);

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/auth/:path*'
    ]
};