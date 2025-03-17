import express, {Router} from 'express';
import {UserController} from "../controllers/user.controller";

let userRouter: Router = express.Router();

const userController = new UserController();

userRouter.get('/all', userController.getAllUsers);
userRouter.put('/update/:userId', userController.editUser);
userRouter.delete('/:userId', userController.deleteUser);

export default userRouter
