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
    try {
        await OrganizationModel.sync();
        console.log('Organization table created successfully!');
    } catch (err) {
        throw new Error('Unable to create organization table : '+ err);
    }
}

export default OrganizationModel;