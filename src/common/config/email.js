import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendVerificationEmail = async (email, token) => {
    const verificationUrl =
        `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    await transporter.sendMail({
        from: process.env.SMTP_FROM_ADDRESS,
        to: email,
        subject: "Verify Your Email",
        html: `
            <h2>Welcome!</h2>

            <p>Click the button below to verify your email.</p>

            <a href="${verificationUrl}"
               style="
                   display:inline-block;
                   padding:12px 24px;
                   background:#2563eb;
                   color:white;
                   text-decoration:none;
                   border-radius:6px;
               ">
                Verify Email
            </a>

            <p>This link expires in 15 minutes.</p>

            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p>${verificationUrl}</p>
        `,
    });
};

const sendForgotPasswordEmail = async (email, token) => {
    const resetPasswordUrl =
        `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
        from: process.env.SMTP_FROM_ADDRESS,
        to: email,
        subject: "Reset Your Password",
        html: `
            <h2>Password Reset Request</h2>

            <p>We received a request to reset your password.</p>

            <p>Click the button below to create a new password.</p>

            <a href="${resetPasswordUrl}"
               style="
                   display:inline-block;
                   padding:12px 24px;
                   background:#dc2626;
                   color:white;
                   text-decoration:none;
                   border-radius:6px;
               ">
                Reset Password
            </a>

            <p>This link expires in 15 minutes.</p>

            <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>

            <p>If the button doesn't work, copy and paste this link into your browser:</p>

            <p>${resetPasswordUrl}</p>
        `,
    });
};

export { 
    sendVerificationEmail,
    sendForgotPasswordEmail
};   