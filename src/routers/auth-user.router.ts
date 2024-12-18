import express, {Router} from 'express';
import {AuthUserController} from "../controllers/auth-user.controller";
import VerifyRecordMiddleware from "../middleware/verify-record.middleware";
import {VerifyTokenMiddleware} from "../middleware/verify-token.middleware";

let authRouter: Router = express.Router();

const authUserController = new AuthUserController();

const { verifyOrganizationExists, verifyUserNotExists } = new VerifyRecordMiddleware();
const { verifyUserToken } = new VerifyTokenMiddleware();

authRouter.post('/users/register',[verifyOrganizationExists, verifyUserNotExists], authUserController.registerUser);
authRouter.get('/users/login', authUserController.loginUser);
authRouter.delete('/users/:userId',[verifyUserToken], authUserController.deleteUser);

export default authRouter;