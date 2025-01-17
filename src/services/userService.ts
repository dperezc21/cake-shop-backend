import UserModel from "../models/user.model";
import {EncryptPasswordHelper} from "../helpers/EncryptPasswordHelper";
import {RegisterUserInterface} from "../interfaces/auth-user.interface";
import {Model} from "sequelize";

const encryptPassword = new EncryptPasswordHelper();

export class UserService {

    createUser(organizationId: string, {name, lastName, password, phone, email, role}: RegisterUserInterface) {
        return new Promise(async(resolve, reject) => {
            const passwordEncrypted: string = password ? encryptPassword.encryptPassword(password) : '';
            UserModel.create({
                first_name: name,
                last_name: lastName,
                password: passwordEncrypted,
                phone,
                email,
                company_id: organizationId,
                user_rol_name: role ? role : "user"
            }).then(value => {
                resolve(value?.dataValues);
            }).catch(reject);
        });
    }

    findUserByEmail(email: string): Promise<Model> {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ where: { email }})
                .then(resolve).catch(reject);
        });
    }

    deleteUser(userId: string): Promise<number> {
        return new Promise((resolve, reject) => {
            UserModel.destroy({
                where: { id: userId }
            }).then(resolve).catch(reason => reject(-1));
        });
    }

    findUserByd(id: string): Promise<Model> {
        return new Promise((resolve, reject) => {
            UserModel.findByPk(id).then(resolve).catch(reject);
        });
    }

    updateUser(userId: string, { name: first_name, lastName: last_name, phone, email, role: user_rol_name }: RegisterUserInterface): Promise<boolean> {
        return new Promise((resolve, reject) => {
           UserModel.update({ first_name, last_name, phone, email, user_rol_name }, { where: { id: userId } })
               .then(value => resolve(value[0] == 1)).catch(reject);
        });
    }
}