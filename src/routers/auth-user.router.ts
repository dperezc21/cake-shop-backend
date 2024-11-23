import express, {Router} from 'express';
import {AuthUserController} from "../controllers/auth-user.controller";

let router: Router = express.Router();

const authUserController = new AuthUserController();

router.post('/user/register', authUserController.registerUser);

module.exports = router;