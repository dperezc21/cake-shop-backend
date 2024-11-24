import {CakeImage, CakeInterface} from "../interfaces/cake.interface";
import {Model} from "sequelize";


export class MapCakeHelper {
    static mapCake(cakeModel: any): CakeInterface {
        return {
            id: cakeModel.id,
            name: cakeModel.name,
            description: cakeModel.description,
            images: cakeModel.CakeImages.map(this.mapCakeImage)
        }
    }

    static mapCakeList(cakes: Model<any>[]): CakeInterface[] {
        return cakes.map(value =>  this.mapCake(value.dataValues));
    }

    static mapCakeImage(image: any): CakeImage {
        return {
            url: image.url,
            id: image.id
        }
    }
}