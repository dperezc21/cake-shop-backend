import {CakeImage} from "../interfaces/cake.interface";
import CakeImageModel from "../models/cake-image.model";

export class CakeImageController {
    saveImagesCake(images: CakeImage[], cakeIdCreated: number) {
        const imageData = images.map((value: CakeImage) => {
            return {
                url: value.url,
                cake_id: cakeIdCreated
            }
        });
        CakeImageModel.bulkCreate(imageData).then().catch(console.error);
    }
}