import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { name, email, message } = await request.json();

        // Validate input
        if (!name || !email || !message) {
            return Response.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return Response.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Create transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email options
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Contact Form Submission from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        console.log({mailOptions}, "========mailOptions========>");
        // Send email
        await transporter.sendMail(mailOptions);

        return Response.json(
            { message: 'Message sent successfully!' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error sending email:', error);
        return Response.json(
            { error: 'Failed to send message', error },
            { status: 500 }
        );
    }
}
