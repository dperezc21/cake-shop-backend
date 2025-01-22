import connectionDataBase from "../db/connection";
import {DataTypes} from "sequelize";
import CakeModel from "./cake.model";

const CakeImageModel = connectionDataBase.connection().define('CakeImage', {
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    tableName: 'cake_image'
});

CakeModel.hasMany(CakeImageModel, {foreignKey: 'cake_id'});

export async function createCakeImageTable() {
    return new Promise(async(resolve, reject) => {
        CakeImageModel.sync({alter: true})
            .then(value => resolve('cake image table created successfully!'))
            .catch(reason => reject('Unable to create cake image table '+ reason));
    });
}

export default CakeImageModel;