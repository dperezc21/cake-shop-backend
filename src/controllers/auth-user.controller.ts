import {Request, Response} from 'express';
import {RegisterUserInterface, UserInterface} from "../interfaces/auth-user.interface";
import UserModel from "../models/user.model";
import {AuthLoginUserInterface} from "../interfaces/auth-login-user.interface";
import {Model} from "sequelize";

import {ResponseUtil} from "../utils/response.util";
import {MapUserUtil} from "../utils/mappers/map-user.util";
import {EncryptPasswordHelper} from "../helpers/EncryptPasswordHelper";
import {UserServices} from "../services/user.services";
import {CreateUserError} from "../utils/exceptions/create-model-error";
import {JwtHelper} from "../helpers/jwt.helper";

const encryptPassword = new EncryptPasswordHelper();
const userService = new UserServices();
const jwt = new JwtHelper();

export class AuthUserController {
    async registerUser(req: Request, res: Response) {
        const organizationId: string = req.query.organizationId as string;
        const userToRegister: RegisterUserInterface = req.body as RegisterUserInterface;
        try {
            const creatingUser = await userService.createUser(organizationId, userToRegister);
            const responseUser: UserInterface = MapUserUtil.mapUser(creatingUser);
            if(creatingUser) ResponseUtil.responseJson(res, "user registered", responseUser);
            else ResponseUtil.responseJson(res, "user did not register", null);
        } catch (err) {
            throw new CreateUserError("Error while create a user");
        }
    }

    async loginUser(req: Request, res: Response) {
        const {password, email} : AuthLoginUserInterface = req.query as any;
        const userFound: Model = await userService.findUserByEmail(email);

        if(!userFound?.dataValues?.id) {
            ResponseUtil.responseJson(res, "user did not found", null, 404);
            return ;
        }
        const { dataValues: user } = userFound;
        const responseUser: UserInterface = MapUserUtil.mapUser(user);
        const verifyPassword: boolean = encryptPassword.verifyPasswordEncrypted(password, user.password);
        if(!verifyPassword) ResponseUtil.responseJson(res, "password incorrect", null, 401);
        else {
            const userToken = await jwt.createJWT(responseUser);
            res.cookie('token', userToken, { httpOnly: true, secure: true });
            ResponseUtil.responseJson(res, "user found", responseUser);
        }
    }

    async deleteUser(req: Request, res: Response) {
        const userId: string = req.params.userId;
        const deleteUser: number = await userService.deleteUser(userId);
        if (deleteUser > 0) ResponseUtil.responseJson(res, "user deleted", deleteUser);
        else ResponseUtil.responseJson(res, "", null, 201);
    }
}