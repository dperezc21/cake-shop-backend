import {DataTypes} from "sequelize";
import {configDB} from "../db/connection";

const UserModel = configDB.define('User',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'user'
});

export async function createUserTable() {
    try {
        await UserModel.sync();
        console.log('User table created successfully!');
    } catch (err) {
        throw new Error('Unable to create table : '+ err);
    }
}

export default UserModel;