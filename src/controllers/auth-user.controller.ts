import { Request, Response } from 'express';
import {RegisterUserInterface} from "../interfaces/auth-user.interface";
import UserModel from "../models/user.model";

export class AuthUserController {
    async registerUser(req: Request, res: Response) {
        const {name, lastName, password, phone, email}: RegisterUserInterface = req.body as RegisterUserInterface;

        const creatingUser = await UserModel.create({ firstName: name, lastName, password, phone, email }).then();

        if(creatingUser) res.status(200).json({
            message: "user registered"
        });

        else res.status(500).json({
            message: "user did not register"
        });
    }
}