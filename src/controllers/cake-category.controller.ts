import {Request, Response} from 'express';
import {ResponseUtil} from "../utils/response.util";
import {CakeCategoryService} from "../services/cake-category.service";
import {CakeCategoryInterface} from "../interfaces/cake-category.interface";
import {MapCakeCategoryUtil} from "../utils/mappers/map-cake-category.util";

const cakeCategoryService: CakeCategoryService = new CakeCategoryService();

export class CakeCategoryController {
    async createNewCategory(req: Request, res: Response) {
        const {categoryName, description}: CakeCategoryInterface = req.body;
        try {
            const categoryCreated = await cakeCategoryService.saveNewCategory(categoryName, description);
            const response: CakeCategoryInterface = MapCakeCategoryUtil.mapCakeCategory(categoryCreated?.dataValues?.id);
            ResponseUtil.responseJson(res, "cake category created", response);
        } catch (e: any) {
            ResponseUtil.responseJson(res, "Error to create category cake", null);
        }
    }
}