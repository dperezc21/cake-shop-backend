import { Sequelize } from 'sequelize';

export const configDB = new Sequelize(
    'cake_shop',
    'root',
    '',
    {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306
    });

export function connect() {
    configDB.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connection to the database: ', error);
    });
}
