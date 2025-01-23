import express, {Router} from 'express';
import {UserController} from "../controllers/user.controller";
import {VerifyTokenMiddleware} from "../middleware/verify-token.middleware";

let userRouter: Router = express.Router();

const userController = new UserController();
const { verifyUserToken } = new VerifyTokenMiddleware();

userRouter.get('/all', userController.getAllUsers);
userRouter.get('/update/:userId', userController.editUser);
userRouter.delete('/:userId',[verifyUserToken], userController.deleteUser);

export default userRouter
