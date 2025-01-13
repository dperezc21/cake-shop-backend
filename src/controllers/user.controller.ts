import {Request, Response} from "express";
import {RegisterUserInterface, UserInterface} from "../interfaces/auth-user.interface";
import {MapUserUtil} from "../utils/mappers/map-user.util";
import {ResponseUtil} from "../utils/response.util";
import UserModel from "../models/user.model";
import {UserService} from "../services/userService";
import {Model} from "sequelize";

const userService = new UserService();

export class UserController {
    async getAllUsers(req: Request, res: Response) {
        const organizationId: string = req.query.organizationId as string;
        const getUsers = await UserModel.findAll({
            where: { company_id: organizationId }
        });
        const response: UserInterface[] = MapUserUtil.mapUserList(getUsers);
        ResponseUtil.responseJson(res, "user list", response);
    }

    async editUser(req: Request, res: Response) {
        const userId: string = req.params.userId as string;
        const userData: RegisterUserInterface = req.body as RegisterUserInterface;

        try {
            const getUser: Model = await userService.findUserByd(userId);

            if(!getUser?.dataValues?.id) {
                ResponseUtil.responseJson(res, "user not exists", null, 400);
                return ;
            }
            const userUpdated: boolean = await userService.updateUser(userId, userData);

            if(userUpdated) ResponseUtil.responseJson(res, "user updated", userData);
            else ResponseUtil.responseJson(res, "user did not update", null);
        } catch (err) {
            ResponseUtil.responseJson(res, "error updating user", false, 500);
        }
    }
}