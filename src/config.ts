//process?.loadEnvFile?.();
import {Dialect} from "sequelize";

require('dotenv').config();
export const {
    DB_NAME ,
    DB_USER_NAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    SECRET_JSON_WEB_TOKEN,
    PRODUCTION
} = process.env;

export const PORT: number = 3000;