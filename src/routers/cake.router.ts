import express = require('express');
import {CakeController} from "../controllers/cake.controller";
import VerifyRecordMiddleware from "../middleware/verify-record.middleware";

const cakeRouter = express.Router();
const cakeController = new CakeController();


const { verifyOrganizationExists } = new VerifyRecordMiddleware();

cakeRouter.post('', cakeController.saveCake);
cakeRouter.get('', [verifyOrganizationExists], cakeController.getCakesByOrganization);

export default cakeRouter;