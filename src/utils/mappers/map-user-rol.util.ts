import {Model} from "sequelize";


export class MapUserRolUtil {

    static mapUserRol(userRole: any): string {
        return userRole.rol_name
    }

    static mapUserRolList(list: Model[]): string[] {
        return list.map(value => this.mapUserRol(value.dataValues));
    }

}