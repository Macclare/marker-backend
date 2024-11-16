import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const db = new Sequelize(
    process.env.DB_NAME || 'app', // Database name
    process.env.DB_USER || '',   // Username
    process.env.DB_PASSWORD || '', // Password
    {
        host: process.env.DB_HOST || 'localhost', // Host
        port: Number(process.env.DB_PORT) || 5432, // Port
        dialect: 'postgres', // Dialect
        logging: false,      // Disable logging
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Use true for stricter verification
            },
        },
    }
    
);

export const URL = process.env.URL as string;

