import express = require('express');
import {CakeController} from "../controllers/cake.controller";
import VerifyRecordMiddleware from "../middleware/verify-record.middleware";
import {VerifyTokenMiddleware} from "../middleware/verify-token.middleware";

const cakeRouter = express.Router();
const cakeController = new CakeController();

const { verifyOrganizationExists } = new VerifyRecordMiddleware();
const { verifyUserToken } = new VerifyTokenMiddleware();

cakeRouter.post('',[verifyUserToken], cakeController.saveCake);
cakeRouter.get('', [verifyUserToken, verifyOrganizationExists], cakeController.getCakesByOrganization);

export default cakeRouter;