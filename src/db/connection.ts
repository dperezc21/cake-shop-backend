import { Sequelize } from 'sequelize';
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER_NAME} from "../config";

export const configDB = new Sequelize(
    DB_NAME,
    DB_USER_NAME,
    DB_PASSWORD,
    {
        dialect: 'mysql',
        host: DB_HOST,
        port: DB_PORT
    });
console.log("DB_NAME", DB_NAME);
console.log("PORT", DB_HOST);

export function connect() {
    configDB.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connection to the database: ', error);
    });
}
