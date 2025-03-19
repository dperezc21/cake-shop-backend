import {Request, Response} from 'express';
import {UserRoleService} from "../services/user-role.service";
import {ResponseUtil} from "../utils/response.util";
import {MapUserRolUtil} from "../utils/mappers/map-user-rol.util";

const userRoleService = new UserRoleService();

export class UserRolController {

    async saveUserRol(req: Request, res: Response) {
        const role: string = req.params.roleName as string;
        try {
            const findRole = await userRoleService.getRoleById(role);
            if(findRole?.dataValues?.rol_name) {
                ResponseUtil.responseJson(res, "role exists yet", null, 400);
                return;
            }
            const rolCreated: boolean = await userRoleService.saveRole(role);
            if(rolCreated) ResponseUtil.responseJson(res, "user rol created", rolCreated);
        } catch (err) {
            ResponseUtil.responseJson(res, "error while create user rol", false, 500);
        }
    }

    async getAllRoles(req: Request, res: Response) {
        try {
            const findRoles = await userRoleService.allRoles();
            const roles: string[] = MapUserRolUtil.mapUserRolList(findRoles);
            ResponseUtil.responseJson(res, "roles", roles);
        } catch (err) {
            ResponseUtil.responseJson(res, "error while create user rol", false, 500);
        }
    }
}