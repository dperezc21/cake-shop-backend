import { Router } from 'express';
import {OrganizationController} from "../controllers/organization.controller";

const organizationRouter = Router();
const organizationController = new OrganizationController();

organizationRouter.post('', organizationController.saveOrganization);

export default organizationRouter;