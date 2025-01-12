import express, {Router} from 'express';
import VerifyRecordMiddleware from "../middleware/verify-record.middleware";
import {UserController} from "../controllers/user.controller";

let userRouter: Router = express.Router();

const userController = new UserController();

const { verifyOrganizationExists } = new VerifyRecordMiddleware();

userRouter.get('/all',[verifyOrganizationExists], userController.getAllUsers);

export default userRouter
