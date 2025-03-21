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

export async function addColumnReferenceToCakeCategory() {
    return new Promise(async(resolve, reject) => {
        const addColumnQuery: string = "ALTER TABLE cake ADD COLUMN cake_category_id INTEGER";
        await connectionDataBase.connection().query(addColumnQuery)
            .catch(reason => reject("Error to create column in cake:"+ reason));
        const addConstraint: string = "ALTER TABLE cake ADD FOREIGN KEY(cake_category_id) REFERENCES cake_category(id)";
        await connectionDataBase.connection().query(addConstraint)
            .catch(reason => reject("Error to create reference to cake category:"+ reason));
        resolve("cake constraint to relationship with cake category created");
    });
}

export async function createCakeTable() {
    return new Promise(async(resolve, reject) => {
        CakeModel.sync({alter: true})
            .then(value => resolve('Cake table created successfully!'))
            .catch(reason => reject('Unable to create cake table '+ reason));
    });
}

export default CakeModel;