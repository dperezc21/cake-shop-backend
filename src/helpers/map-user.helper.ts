import {UserInterface} from "../interfaces/auth-user.interface";
import {Model} from "sequelize";


export class MapUserHelper {
    static mapUser(user: any): UserInterface {
        return {
            id: user.id,
            name: user.firstName,
            email: user.email,
            phone: user.phone,
            lastName: user.lastName
        }
    }

    static mapUserList(userList: Model<any>[]): UserInterface[] {
        return userList.map(value => this.mapUser(value.dataValues));
    }
}