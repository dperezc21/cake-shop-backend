import express = require('express');
import {CakeController} from "../controllers/cake.controller";
import {VerifyTokenMiddleware} from "../middleware/verify-token.middleware";

const cakeRouter = express.Router();
const cakeController = new CakeController();

const { verifyUserToken } = new VerifyTokenMiddleware();

cakeRouter.post('',[verifyUserToken], cakeController.saveCake);
cakeRouter.get('', cakeController.getCakesByOrganization);
cakeRouter.get('/filter', cakeController.filterCake);

export default cakeRouter;