import {CakeCategoryInterface} from "../../interfaces/cake-category.interface";

export class MapCakeCategoryUtil {
    static mapCakeCategory(model: any): CakeCategoryInterface {
        return {
            id: model.id,
            categoryName: model.category_name,
            description: model.description
        }
    }
}