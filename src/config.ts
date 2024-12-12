if(!Boolean(process.env.PRODUCCTION)) process.loadEnvFile();

export const {
    DB_NAME ,
    DB_USER_NAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    SECRET_JSON_WEB_TOKEN
} = process.env;

export const PORT: number = 3000;