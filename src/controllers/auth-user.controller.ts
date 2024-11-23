import { Request, Response } from 'express';
import {RegisterUserInterface} from "../interfaces/auth-user.interface";

export class AuthUserController {
    registerUser(req: Request, res: Response) {
        const user: RegisterUserInterface = req.body as RegisterUserInterface;
        res.status(200).json({
            message: "usuario registrado"
        });
    }
}