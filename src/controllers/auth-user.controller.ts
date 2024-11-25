import {Request, Response} from 'express';
import {RegisterUserInterface, UserInterface} from "../interfaces/auth-user.interface";
import UserModel from "../models/user.model";
import {AuthLoginUserInterface} from "../interfaces/auth-login-user.interface";
import {Model} from "sequelize";
import {ResponseHelper} from "../helpers/response.helper";
import {MapUserHelper} from "../helpers/map-user.helper";

export class AuthUserController {
    async registerUser(req: Request, res: Response) {
        const {name, lastName, password, phone, email}: RegisterUserInterface = req.body as RegisterUserInterface;

        const creatingUser: Model = await UserModel.create({ firstName: name, lastName, password, phone, email }).then();
        const responseUser: UserInterface = MapUserHelper.mapUser(creatingUser.dataValues);
        if(creatingUser) ResponseHelper.responseJson(res, "user registered", responseUser);

        else ResponseHelper.responseJson(res, "user did not register", null, 500);
    }

    async loginUser(req: Request, res: Response) {
        const {password, email} : AuthLoginUserInterface = req.query as any;
        const userFound: Model = await UserModel.findOne({
            where: { email, password }
        });
        const responseUser: UserInterface = MapUserHelper.mapUser(userFound.dataValues);
        if(userFound?.dataValues?.id) ResponseHelper.responseJson(res, "user found", responseUser);

        else ResponseHelper.responseJson(res, "user did not found", null, 404);
    }
}