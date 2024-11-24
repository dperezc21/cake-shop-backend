import express = require('express');
import {CakeController} from "../controllers/cake.controller";

const cakeRouter = express.Router();
const cakeController = new CakeController();

cakeRouter.post('', cakeController.saveCake);

export default cakeRouter;