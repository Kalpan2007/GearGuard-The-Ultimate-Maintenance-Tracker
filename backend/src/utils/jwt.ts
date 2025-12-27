import jwt from 'jsonwebtoken';
import config from '../config';

export interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

/**
 * Generate JWT token
 */
export function generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
    });
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): JwtPayload {
    try {
        return jwt.verify(token, config.jwt.secret) as JwtPayload;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}
