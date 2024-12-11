import {Sequelize} from "sequelize";

export interface ConnectionRepository {
    connection(): Sequelize;
    connect(): void;
    disconnect(): void;

}