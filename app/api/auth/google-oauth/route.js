import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

export async function GET() {
    // Generate OAuth URL
    const scopes = [
        // 'https://www.googleapis.com/auth/dfp',
        'https://www.googleapis.com/auth/userinfo.email'
    ];

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent'
    });

    return new Response(
        JSON.stringify({
            success: true,
            authUrl
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}

export async function POST(req) {
    try {
        const { code } = await req.json();

        if (!code) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: 'Authorization code is required'
                }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const { tokens } = await oauth2Client.getToken(code);

        return new Response(
            JSON.stringify({
                success: true,
                tokens: {
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token,
                    expiryDate: tokens.expiry_date
                }
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: `OAuth exchange failed: ${error.message}`
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
