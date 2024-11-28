import { Router } from 'express';
import {OrganizationController} from "../controllers/organization.controller";

const organizationRouter = Router();
const organizationController = new OrganizationController();

organizationRouter.post('', organizationController.saveOrganization);
organizationRouter.get('/:organizationId', organizationController.getOrganizationById);
organizationRouter.get('', organizationController.getOrganizationsList);
organizationRouter.get('/:name/company', organizationController.getOrganizationByName);

export default organizationRouter;