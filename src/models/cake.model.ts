
import connectionDataBase from "../db/connection";
import {DataTypes} from "sequelize";
import OrganizationModel from "./organization.model";

const CakeModel = connectionDataBase.connection().define('Cake',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { tableName: 'cake'});

OrganizationModel.hasMany(CakeModel, {foreignKey: 'company_id'});

export async function createCakeTable() {
    return new Promise(async(resolve, reject) => {
        CakeModel.sync({alter: true})
            .then(value => resolve('Cake table created successfully!'))
            .catch(reason => reject('Unable to create cake table '+ reason));
    });
}

export default CakeModel;