import connection from "../db/connection";
import {DataTypes} from "sequelize";

export class CategoryCakeModel {
    private static categoryCake: any;

    constructor() {
       CategoryCakeModel.categoryCake = connection.connection().define('CategoryCake',{
            category_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.STRING,
            }
        }, {
            tableName: 'category_cake'
        });
    }

    async createCategoryCakeTable() {
        return new Promise(async(resolve, reject) => {
            CategoryCakeModel.categoryCake.sync({alter: true})
                .then(() => resolve('category cake table created successfully!'))
                .catch((reason: string) => reject('Unable to create category cake table '+ reason));
        });
    }

    static getModel() {
        return CategoryCakeModel.categoryCake;
    }

}