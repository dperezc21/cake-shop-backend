import {Model} from "sequelize";
import {CakeCategoryModel} from "../models/cake-category.model";

export class CakeCategoryService {

    async saveNewCategory(categoryName: string, description: string = ""): Promise<Model> {
        return new Promise(async(resolve, reject) => {
           const categoryCreated = await CakeCategoryModel.getModel().findOrCreate({
               where: { category_name: categoryName },
               defaults: { category_name: categoryName, description }
           });
           resolve(categoryCreated[0]);
        });
    }

    async getAllCategories(): Promise<Model[]> {
        return new Promise(async(resolve, reject) => {
            const categoryCreated = await CakeCategoryModel.getModel().findAll();
            resolve(categoryCreated);
        });
    }
}