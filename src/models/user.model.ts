import {DataTypes} from "sequelize";
import connectionDataBase from "../db/connection";
import OrganizationModel from "./organization.model";

const UserModel = connectionDataBase.connection().define('User',{
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'user'
});
OrganizationModel.hasMany(UserModel, {foreignKey: 'company_id'});

export async function createUserTable() {
    return new Promise(async(resolve, reject) => {
        UserModel.sync({alter: true})
            .then(value => resolve('user table created successfully!'))
            .catch(reason => reject('Unable to create user table'));
    });
}

export default UserModel;