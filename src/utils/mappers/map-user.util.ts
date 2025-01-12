import {UserInterface} from "../../interfaces/auth-user.interface";
import {Model} from "sequelize";


export class MapUserUtil {
    static mapUser(user: any): UserInterface {
        return {
            id: user.id,
            name: user.first_name,
            email: user.email,
            phone: user.phone,
            lastName: user.last_name,
            role: user.user_rol_name
        }
    }

    static mapUserList(userList: Model<any>[]): UserInterface[] {
        return userList.map(value => this.mapUser(value.dataValues));
    }
}