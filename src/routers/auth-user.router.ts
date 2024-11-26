import express, {Router} from 'express';
import {AuthUserController} from "../controllers/auth-user.controller";

let authRouter: Router = express.Router();

const authUserController = new AuthUserController();

authRouter.post('/users/register', authUserController.registerUser);
authRouter.get('/users/login', authUserController.loginUser);
authRouter.delete('/users/:userId', authUserController.deleteUser);

export default authRouter;