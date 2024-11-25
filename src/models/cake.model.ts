import {configDB} from "../db/connection";
import {DataTypes} from "sequelize";
import UserModel from "./user.model";

const CakeModel = configDB.define('Cake',{
    /*id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },*/
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    /*userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id',
        },
        allowNull: false
    }*/
}, { tableName: 'cake'});

UserModel.hasMany(CakeModel, {foreignKey: 'userId'});

export async function createCakeTable() {
    try {
        await CakeModel.sync();
        console.log('Cake table created successfully!');
    } catch (err) {
        throw new Error('Unable to create cake table : '+ err);
    }
}

export default CakeModel;