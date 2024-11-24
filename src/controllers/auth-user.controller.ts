import { Request, Response } from 'express';
import {RegisterUserInterface} from "../interfaces/auth-user.interface";
import UserModel from "../models/user.model";
import {AuthLoginUserInterface} from "../interfaces/auth-login-user.interface";
import {Model} from "sequelize";

export class AuthUserController {
    async registerUser(req: Request, res: Response) {
        const {name, lastName, password, phone, email}: RegisterUserInterface = req.body as RegisterUserInterface;

        const creatingUser: Model = await UserModel.create({ firstName: name, lastName, password, phone, email }).then();

        if(creatingUser) res.status(200).json({
            message: "user registered",
            result: creatingUser
        });

        else res.status(500).json({
            message: "user did not register"
        });
    }

    async loginUser(req: Request, res: Response) {
        const {password, email} : AuthLoginUserInterface = req.query as any;
        const findUser: Model = await UserModel.findOne({
            where: { email, password }
        });

        if(findUser?.dataValues?.id) res.status(200).json({
            message: "user found",
            result: findUser
        });
        else res.status(404).json({
            message: "user did not found",
            result: null
        })
    }
}