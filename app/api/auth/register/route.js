import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const client = new MongoClient(process.env.MONGODB_URI);

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Name, email and password are required' },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters long' },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        await client.connect();
        const db = client.db(process.env.DB_NAME || 'gam_dashboard');
        const users = db.collection('users');

        // Check if user exists
        const existingUser = await users.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { error: 'An account with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const newUser = {
            name: name.trim(),
            email: email.toLowerCase(),
            password: hashedPassword,
            provider: 'credentials',
            createdAt: new Date(),
            lastLogin: new Date(),
            emailVerified: false,
            image: null
        };

        const result = await users.insertOne(newUser);

        return NextResponse.json(
            {
                success: true,
                message: 'Account created successfully',
                userId: result.insertedId.toString()
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Failed to create account. Please try again.' },
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}