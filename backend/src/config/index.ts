import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    databaseUrl: string;
    jwt: {
        secret: string;
        expiresIn: string;
    };
    cors: {
        origin: string[];
    };
}

const config: Config = {
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    databaseUrl: process.env.DATABASE_URL || '',
    jwt: {
        secret: process.env.JWT_SECRET || 'fallback-secret-change-in-production',
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
    cors: {
        origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    },
};

export default config;
