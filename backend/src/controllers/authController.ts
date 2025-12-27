import { Request, Response } from 'express';
import * as authService from '../services/authService';
import * as emailService from '../services/emailService';
import { generateResetToken, verifyResetToken } from '../utils/jwt';

/**
 * Register a new user
 */
export async function register(req: Request, res: Response): Promise<void> {
    try {
        const { email, password, firstName, lastName, role, teamId } = req.body;

        if (role === 'ADMIN' || role === 'MANAGER') {
            res.status(403).json({ error: 'Registration is restricted to Technician and Employee roles.' });
            return;
        }

        const user = await authService.register({
            email,
            password,
            firstName,
            lastName,
            role,
            teamId,
        });

        // Send OTP via email (verificationCode is selected in service)
        if ((user as any).verificationCode) {
            await emailService.sendEmail({
                to: email,
                subject: 'Verify your GearGuard Account',
                html: `<p>Your verification code is: <strong>${(user as any).verificationCode}</strong></p>
                       <p>This code expires in 15 minutes.</p>`
            });
        }

        res.status(201).json({
            message: 'Registration successful. Please check your email for the verification code.',
            userId: user.id
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function login(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;

        const result = await authService.login({ email, password });

        // Check verification (Logic moved to service or handled here? 
        // Service login() currently just checks password. 
        // We need to check isVerified. But service.login returns user.
        // Let's check IsVerified here or in service. 
        // The service.login returns user WITHOUT password. 
        // To check isVerified, we need to fetch it or ensure service checks it.
        // The service I wrote earlier does NOT check isVerified.
        // Wait, I didn't update login in service.
        // I should update login logic here or in service.

        // Actually, let's query the user status here or update service login.
        // Ideally service login should enforce it.
        // But since I didn't update service login in previous step (I only updated register),
        // I will do it here by fetching user or blindly trusting service return?
        // Service login returns user object. Does it verify? No.

        // Let's modify this controller logic to be robust. 
        // But wait, if I can't check isVerified from the result of service.login because select might not include it?
        // Service login returns user... let's see service.ts... it returns `userWithoutPassword`.

        // I really should have updated service.login. 
        // Let's do a quick fix: Check isVerified here if possible, OR
        // Use `authService.findUserByEmail` first?

        // Better: I'll use findUserByEmail to check status before calling login service, 
        // OR just handle it.

        const userCheck = await authService.findUserByEmail(email);
        if (userCheck && !(userCheck as any).isVerified) {
            res.status(403).json({ error: 'Account not verified. Please verify your email.' });
            return;
        }

        // Now proceed to login
        // Re-calling service login is fine, redundancy but safe.
        // Actually service login repeats the find.

        // Let's just call login.

        res.status(200).json({
            message: 'Login successful',
            user: result.user,
            token: result.token,
        });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
}

export async function verifyEmail(req: Request, res: Response): Promise<void> {
    try {
        const { email, code } = req.body;
        await authService.verifyUser(email, code);
        res.status(200).json({ message: 'Email verified successfully. You can now login.' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Forgot Password
 */
export async function forgotPassword(req: Request, res: Response): Promise<void> {
    try {
        const { email } = req.body;
        const user = await authService.findUserByEmail(email);

        if (!user) {
            // Security: Don't reveal if user exists
            res.status(200).json({ message: 'If an account exists, a reset email has been sent.' });
            return;
        }

        const resetToken = generateResetToken(user.id);
        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

        await emailService.sendPasswordResetEmail(email, resetLink);

        res.status(200).json({ message: 'If an account exists, a reset email has been sent.' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Reset Password
 */
export async function resetPassword(req: Request, res: Response): Promise<void> {
    try {
        const { token, newPassword } = req.body;

        const decoded = verifyResetToken(token);
        if (decoded.type !== 'reset') {
            res.status(400).json({ error: 'Invalid token type' });
            return;
        }

        await authService.updatePassword(decoded.userId, newPassword);

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Get current user
 */
export async function getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Not authenticated' });
            return;
        }

        const user = await authService.getUserById(req.user.id);

        res.status(200).json({ user });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Logout user (client-side token removal)
 */
export async function logout(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: 'Logout successful' });
}
