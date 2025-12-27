import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Hash a plain text password
 */
export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare plain text password with hashed password
 */
export async function comparePassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}
