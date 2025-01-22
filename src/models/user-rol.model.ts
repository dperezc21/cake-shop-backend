import connection from "../db/connection";
import connectionDataBase from "../db/connection";
import {DataTypes} from "sequelize";

const queryInterface = connectionDataBase.connection().getQueryInterface();

export const UserRolModel = connection.connection().define('UserRol',{
    rol_name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    }
}, {
    tableName: 'user_rol'
});

export function addColumn() {
    queryInterface.addColumn({ tableName: 'user' },
        'user_rol_name', {
        type: DataTypes.STRING,
        references: {
            model: { tableName: 'user_rol' },
            key: 'rol_name'
        }
    }).then(value => console.log("column added to use"))
}

export async function createUserRolTable() {
    return new Promise(async(resolve, reject) => {
        UserRolModel.sync({alter: true})
            .then(value => resolve('user rol table created successfully!'))
            .catch(reason => reject('Unable to create user rol table '+ reason));
    });
}