import express = require('express');
import {CakeCategoryController} from "../controllers/cake-category.controller";

const cakeCategoryRouter = express.Router();

const {createNewCategory, getCategoryList} = new CakeCategoryController();

cakeCategoryRouter.post('', createNewCategory);
cakeCategoryRouter.get('', getCategoryList);

export default cakeCategoryRouter;