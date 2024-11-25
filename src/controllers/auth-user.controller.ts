import {Request, Response} from 'express';
import {RegisterUserInterface} from "../interfaces/auth-user.interface";
import UserModel from "../models/user.model";
import {AuthLoginUserInterface} from "../interfaces/auth-login-user.interface";
import {Model} from "sequelize";
import {ResponseHelper} from "../helpers/response.helper";

export class AuthUserController {
    async registerUser(req: Request, res: Response) {
        const {name, lastName, password, phone, email}: RegisterUserInterface = req.body as RegisterUserInterface;

        const creatingUser: Model = await UserModel.create({ firstName: name, lastName, password, phone, email }).then();

        if(creatingUser) ResponseHelper.responseJson(res, "user registered", creatingUser);

        else ResponseHelper.responseJson(res, "user did not register", null, 500);
    }

    async loginUser(req: Request, res: Response) {
        const {password, email} : AuthLoginUserInterface = req.query as any;
        const findUser: Model = await UserModel.findOne({
            where: { email, password }
        });

        if(findUser?.dataValues?.id) ResponseHelper.responseJson(res, "user found", findUser);

        else ResponseHelper.responseJson(res, "user did not found", null, 404);
    }
}