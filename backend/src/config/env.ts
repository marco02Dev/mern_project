import dotenv from 'dotenv';
dotenv.config();

const env = process.env;

export const databaseUri = env.DATABASE_URI;
export const port: number = Number(env.PORT) || 8000;