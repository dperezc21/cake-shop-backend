import {UserRolModel} from "../models/user-rol.model";
import {Model} from "sequelize";

export class UserRoleService {

    async getRoleById(role: string): Promise<Model> {
        return new Promise((resolve, reject) => {
            UserRolModel.findByPk(role).then(resolve).catch(reject);
        });
    }

    async saveRole(role: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            UserRolModel.create({ rol_name: role })
                .then(() => resolve(true))
                .catch(reject);
        });
    }

    async allRoles(): Promise<Model[]> {
        return new Promise((resolve, reject) => {
            UserRolModel.findAll()
                .then(value => resolve(value))
                .catch(reject);
        });
    }
}