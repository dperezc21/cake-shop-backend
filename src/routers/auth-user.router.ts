import express, {Router} from 'express';
import {AuthUserController} from "../controllers/auth-user.controller";
import VerifyRecordMiddleware from "../middleware/verify-record.middleware";

let authRouter: Router = express.Router();

const authUserController = new AuthUserController();

const { verifyOrganizationExists, verifyUserNotExists } = new VerifyRecordMiddleware();

authRouter.post('/users/register',[verifyOrganizationExists, verifyUserNotExists], authUserController.registerUser);
authRouter.get('/users/login', authUserController.loginUser);

export default authRouter;