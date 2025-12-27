import { Request, Response } from 'express';
import * as authService from '../services/authService';

/**
 * Register a new user
 */
export async function register(req: Request, res: Response): Promise<void> {
    try {
        const { email, password, firstName, lastName, role, teamId } = req.body;

        const result = await authService.register({
            email,
            password,
            firstName,
            lastName,
            role,
            teamId,
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: result.user,
            token: result.token,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Login user
 */
export async function login(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;

        const result = await authService.login({ email, password });

        res.status(200).json({
            message: 'Login successful',
            user: result.user,
            token: result.token,
        });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
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
