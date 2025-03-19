import express, {Router} from 'express';
import {UserController} from "../controllers/user.controller";
import {AdminAuthorizationMiddleware} from "../middleware/admin-authorization.middleware";

let userRouter: Router = express.Router();

const userController = new UserController();
const { verifyAdminUser } = new AdminAuthorizationMiddleware();

userRouter.get('', userController.getAllUsers);
userRouter.put('/update/:userId', [verifyAdminUser], userController.editUser);
userRouter.delete('/:userId', [verifyAdminUser], userController.deleteUser);

export default userRouter
