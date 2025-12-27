import { prisma } from '../config/database';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';

interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: 'ADMIN' | 'MANAGER' | 'TECHNICIAN' | 'USER';
    teamId?: string;
}

interface LoginData {
    email: string;
    password: string;
}

/**
 * Register a new user
 */
export async function register(data: RegisterData) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role || 'USER',
            teamId: data.teamId,
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            teamId: true,
            createdAt: true,
        },
    });

    // Generate token
    const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
    });

    return { user, token };
}

/**
 * Login user
 */
export async function login(data: LoginData) {
    // Find user
    const user = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await comparePassword(data.password, user.password);

    if (!isValidPassword) {
        throw new Error('Invalid email or password');
    }

    // Generate token
    const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
    });

    // Return user without password
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            avatar: true,
            teamId: true,
            team: {
                select: {
                    id: true,
                    name: true,
                    specialty: true,
                },
            },
            createdAt: true,
        },
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}
