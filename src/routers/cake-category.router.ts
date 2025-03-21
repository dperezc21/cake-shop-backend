import express = require('express');
import {CakeCategoryController} from "../controllers/cake-category.controller";
import {AdminAuthorizationMiddleware} from "../middleware/admin-authorization.middleware";

const cakeCategoryRouter = express.Router();

const { verifyAdminUser } = new AdminAuthorizationMiddleware();

const {createNewCategory} = new CakeCategoryController();

cakeCategoryRouter.post('', [verifyAdminUser], createNewCategory);

export default cakeCategoryRouter;