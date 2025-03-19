import express, {Router} from "express";
import {UserRolController} from "../controllers/user-rol.controller";

const userRolController = new UserRolController();
let authRouter: Router = express.Router();

authRouter.post('/:roleName', userRolController.saveUserRol);
authRouter.get('', userRolController.getAllRoles);

export default authRouter;