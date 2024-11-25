import {configDB} from "../db/connection";
import {DataTypes} from "sequelize";

const OrganizationModel = configDB.define('OrganizationModel', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    image: {
        type: DataTypes.TEXT,
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