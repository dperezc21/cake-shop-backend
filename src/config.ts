import dotenv from 'dotenv';
dotenv.config();

export const PORT: number = 3000;
export const DB_NAME: string = process.env.DB_NAME;
export const DB_USER_NAME: string = process.env.DB_USER_NAME;
export const DB_PASSWORD: string = process.env.DB_PASSWORD;
export const DB_HOST: string = process.env.DB_HOST;
export const DB_PORT: number = Number(process.env.DB_PORT);
export const SECRET_JSON_WEB_TOKEN: string = process.env.SECRET_JWT;