import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const client = new MongoClient(process.env.MONGODB_URI);
const clientPromise = client.connect();
const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // allowDangerousEmailAccountLinking: true
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }

                try {
                    await client.connect();
                    const db = client.db(process.env.DB_NAME || 'gam_dashboard');
                    const users = db.collection('users');

                    // Find user by email
                    const user = await users.findOne({ email: credentials.email });

                    if (!user) {
                        throw new Error('Invalid credentials');
                    }

                    // For users who signed up with OAuth, they won't have a password
                    if (!user.password) {
                        throw new Error('Please sign in with the method you used to register');
                    }

                    // Check password
                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);

                    if (!isValidPassword) {
                        throw new Error('Invalid credentials');
                    }

                    // Update last login
                    await users.updateOne(
                        { _id: user._id },
                        { $set: { lastLogin: new Date() } }
                    );

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        image: user.image
                    };
                } catch (error) {
                    console.error('Auth error:', error);
                    throw new Error(error.message || 'Authentication failed');
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },
    jwt: {
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },
    callbacks: {
        async jwt({ token, user, account }) {
            // Persist the OAuth access_token and user id to the token right after signin
            if (account && user) {
                token.userId = user.id;
                token.provider = account.provider;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client
            if (token) {
                session.user.id = token.userId;
                session.user.provider = token.provider;
            }
            return session;
        },
        async signIn({ user, account, profile, email, credentials }) {
            console.log({ user, account, profile, email, credentials })
            if (account?.provider === 'credentials') {
                return true;
            }

            if (account?.provider === 'google') {
                try {
                    await client.connect();
                    const db = client.db(process.env.DB_NAME || 'gam_dashboard');
                    const users = db.collection('users');

                    const existingUser = await users.findOne({ email: user.email });

                    if (!existingUser) {
                        await users.insertOne({
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            provider: account.provider,
                            providerId: account.providerAccountId,
                            createdAt: new Date(),
                            lastLogin: new Date()
                        });
                    } else {
                        // Update last login for existing user
                        await users.updateOne(
                            { email: user.email },
                            { $set: { lastLogin: new Date() } }
                        );
                    }

                    return true;
                } catch (error) {
                    console.error('OAuth sign in error:', error);
                    return false;
                }
            }

            return true;
        }
    },
    pages: {
        signIn: '/auth',
        error: '/auth/error',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
