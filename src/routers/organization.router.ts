import { Router } from 'express';
import {OrganizationController} from "../controllers/organization.controller";
import VerifyRecordMiddleware from "../middleware/verify-record.middleware";

const organizationRouter = Router();
const organizationController = new OrganizationController();
const { organizationNameNotExists, verifyUserNotExists, verifyOrganizationExists } = new VerifyRecordMiddleware();

organizationRouter.post('', [organizationNameNotExists, verifyUserNotExists], organizationController.saveOrganization);
organizationRouter.get('/:organizationId', organizationController.getOrganizationById);
organizationRouter.get('', organizationController.getOrganizationsList);
organizationRouter.get('/:name/company', organizationController.getOrganizationByName);
organizationRouter.put('/company/:organizationId',[verifyOrganizationExists], organizationController.updateOrganization);

export default organizationRouter;