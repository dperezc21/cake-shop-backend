import { Router } from 'express';
import {OrganizationController} from "../controllers/organization.controller";

const organizationRouter = Router();
const organizationController = new OrganizationController();

organizationRouter.post('/:userId', organizationController.saveOrganization);
//organizationRouter.get('/:userId', organizationController.getOrganizationByUser);

export default organizationRouter;