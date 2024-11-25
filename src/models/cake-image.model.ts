import {configDB} from "../db/connection";
import {DataTypes} from "sequelize";
import CakeModel from "./cake.model";


const CakeImageModel = configDB.define('CakeImage', {
    /*id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },*/
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    /*cakeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Cake',
            key: 'id'
        },
        allowNull: false
    }*/
},{
    tableName: 'cake_image'
});

CakeModel.hasMany(CakeImageModel, {foreignKey: 'cake_id'});

export async function createCakeImageTable() {
    try {
        await CakeImageModel.sync();
        console.log("cake image table created");
    } catch (err) {
        throw new Error(err);
    }
}

export default CakeImageModel;