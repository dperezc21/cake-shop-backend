import express, {Router} from 'express';
import {AuthUserController} from "../controllers/auth-user.controller";

let authRouter: Router = express.Router();

const authUserController = new AuthUserController();

authRouter.post('/user/register', authUserController.registerUser);

export default authRouter;