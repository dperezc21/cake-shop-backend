import {Request, Response} from "express";
import {UserInterface} from "../interfaces/auth-user.interface";
import {MapUserUtil} from "../utils/mappers/map-user.util";
import {ResponseUtil} from "../utils/response.util";
import UserModel from "../models/user.model";

export class UserController {
    async getAllUsers(req: Request, res: Response) {
        const organizationId: string = req.query.organizationId as string;
        const getUsers = await UserModel.findAll({
            where: { company_id: organizationId }
        });
        const response: UserInterface[] = MapUserUtil.mapUserList(getUsers);
        ResponseUtil.responseJson(res, "user list", response);
    }
}