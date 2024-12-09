import {configDB} from "../db/connection";
import {DataTypes} from "sequelize";

const OrganizationModel = configDB.define('OrganizationModel', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logo: {
        type: DataTypes.TEXT,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'company'
});

export async function createOrganizationTable() {
    return new Promise(async(resolve, reject) => {
        OrganizationModel.sync({alter: true})
            .then(value => resolve('Organization table created successfully!'))
            .catch(reason => reject('Unable to create organization table'));
    });
}

export default OrganizationModel;