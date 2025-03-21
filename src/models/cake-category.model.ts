import connection from "../db/connection";
import {DataTypes, Model, ModelStatic} from "sequelize";

export class CakeCategoryModel {
    private static categoryCake: ModelStatic<Model>;

    constructor() {
       CakeCategoryModel.categoryCake = connection.connection().define('CakeCategory',{
            category_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.STRING,
            }
        }, {
            tableName: 'cake_category'
        });
    }

    async createCakeCategoryTable() {
        return new Promise(async(resolve, reject) => {
            CakeCategoryModel.categoryCake.sync({alter: true})
                .then(() => resolve('category cake table created successfully!'))
                .catch((reason: string) => reject('Unable to create cake category table '+ reason));
        });
    }

    static getModel() {
        return CakeCategoryModel.categoryCake;
    }

}