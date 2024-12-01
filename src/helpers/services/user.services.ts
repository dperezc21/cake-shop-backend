import UserModel from "../../models/user.model";
import {EncryptPasswordHelper} from "../EncryptPasswordHelper";
import {RegisterUserInterface} from "../../interfaces/auth-user.interface";

const encryptPassword = new EncryptPasswordHelper();

export class UserServices {

    createUser(organizationId: string, {name, lastName, password, phone, email}: RegisterUserInterface) {
        return new Promise(async(resolve, reject) => {
            const passwordEncrypted: string = encryptPassword.encryptPassword(password);
            UserModel.create({
                first_name: name, last_name: lastName, password: passwordEncrypted, phone, email, company_id: organizationId
            }).then(value => {
                resolve(value?.dataValues);
            }).catch(reason => {
                reject(reason);
            });
        });

    }
}