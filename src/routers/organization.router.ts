import { Router } from 'express';
import {OrganizationController} from "../controllers/organization.controller";

const organizationRouter = Router();
const organizationController = new OrganizationController();

organizationRouter.post('', organizationController.saveOrganization);
organizationRouter.get('/:organizationId', organizationController.getOrganizationById);

export default organizationRouter;