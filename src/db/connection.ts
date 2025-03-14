import {Dialect, Sequelize} from 'sequelize';
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER_NAME, PRODUCTION} from "../config";
import {ConnectionRepository} from "../interfaces/ConnectionRepository";

class ConnectionMysql implements ConnectionRepository {
    private static connectionMysql: ConnectionMysql;
    private static configDB: Sequelize;
    connectionDialect: Dialect = Boolean(PRODUCTION) ? 'mysql' : 'postgres';
    constructor() {
        if(!ConnectionMysql.connectionMysql) {
            this.configDataBase();
            ConnectionMysql.connectionMysql = this;
        }
        return ConnectionMysql.connectionMysql;
    }

    protected configDataBase() {
        ConnectionMysql.configDB = new Sequelize(
            DB_NAME,
            DB_USER_NAME,
            DB_PASSWORD,
            {
                dialect: this.connectionDialect,
                host: DB_HOST,
                port: Number(DB_PORT),
                logging: false
            });
    }

    connect(): void {
        ConnectionMysql.configDB.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connection to the database: ', error);
            this.disconnect();
        });
    }

    connection(): Sequelize {
        return ConnectionMysql.configDB;
    }

    disconnect(): void {
        ConnectionMysql.configDB.close().then(() => {
            console.log("connections to the data base closed");
        }).catch();
    }

}

export default new ConnectionMysql();