import {CakeCategoryInterface} from "../../interfaces/cake-category.interface";
import {Model} from "sequelize";

export class MapCakeCategoryUtil {
    static mapCakeCategory(model: any): CakeCategoryInterface {
        return {
            id: model.id,
            categoryName: model.category_name,
            description: model.description
        }
    }

    static mapCakeCategories(models: Model[]): CakeCategoryInterface[] {
        return models.map(value => this.mapCakeCategory(value.dataValues));
    }
}