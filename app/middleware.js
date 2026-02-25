import { withAuth } from 'next-auth/middleware';

export default withAuth(
    function middleware(req) {
        // Add any additional middleware logic here
        console.log('Middleware executed for:', req.nextUrl.pathname);
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Define protected routes
                const protectedPaths = ['/dashboard', '/profile', '/settings'];
                const isProtectedPath = protectedPaths.some(path =>
                    req.nextUrl.pathname.startsWith(path)
                );

                // If it's a protected path, require authentication
                if (isProtectedPath) {
                    return !!token;
                }

                // Allow all other routes
                return true;
            },
        },
        pages: {
            signIn: '/dashboard/login',
        },
    }
);

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile/:path*',
        '/settings/:path*'
    ]
};
