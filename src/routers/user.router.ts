import express, {Router} from 'express';
import {UserController} from "../controllers/user.controller";

let userRouter: Router = express.Router();

const userController = new UserController();

userRouter.get('/all', userController.getAllUsers);
userRouter.get('/update/:userId', userController.editUser);

export default userRouter
