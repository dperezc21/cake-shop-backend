import {Request, Response} from 'express';
import {ResponseUtil} from "../utils/response.util";
import {CakeCategoryService} from "../services/cake-category.service";
import {CakeCategoryInterface} from "../interfaces/cake-category.interface";
import {MapCakeCategoryUtil} from "../utils/mappers/map-cake-category.util";
import {Model} from "sequelize";

const cakeCategoryService: CakeCategoryService = new CakeCategoryService();

export class CakeCategoryController {
    async createNewCategory(req: Request, res: Response) {
        const {categoryName, description}: CakeCategoryInterface = req.body;
        try {
            const categoryCreated = await cakeCategoryService.saveNewCategory(categoryName, description);
            const response: CakeCategoryInterface = MapCakeCategoryUtil.mapCakeCategory(categoryCreated?.dataValues);
            ResponseUtil.responseJson(res, "cake category created", response);
        } catch (e: any) {
            ResponseUtil.responseJson(res, "Error to create category cake", null);
        }
    }

    async getCategoryList(req: Request, res: Response) {
        try {
            const categoryCreated: Model[] = await cakeCategoryService.getAllCategories();
            const response: CakeCategoryInterface[] = MapCakeCategoryUtil.mapCakeCategories(categoryCreated);
            ResponseUtil.responseJson(res, "list categories", response);
        } catch (e: any) {
            ResponseUtil.responseJson(res, "Error to get all categories cake", null);
        }
    }
}