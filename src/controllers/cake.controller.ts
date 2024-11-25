import {Request, Response} from 'express';
import {CakeInterface} from "../interfaces/cake.interface";
import CakeModel from "../models/cake.model";
import UserModel from "../models/user.model";
import CakeImageModel from "../models/cake-image.model";
import {MapCakeHelper} from "../helpers/map-cake.helper";
import {ResponseHelper} from "../helpers/response.helper";
import {CakeImageController} from "./cake-image.controller";

const cakeImageController = new CakeImageController();

export class CakeController {

    async saveCake(req: Request, res: Response) {
        const { name, description, images }: CakeInterface = req.body;
        const userId: string = req.query.userId as string;

        const user = await UserModel.findByPk(userId);

        if(!user?.dataValues?.id) {
            ResponseHelper.responseJson(res, "user no exists", null, 500);
            return;
        }

        const cakeCreated = await CakeModel.create({
            name, description, userId: user.dataValues.id
        });

        if(cakeCreated) {
            cakeImageController.saveImagesCake(images, cakeCreated.dataValues.id)
            ResponseHelper.responseJson(res, "cake saved", MapCakeHelper.mapCake(cakeCreated));
        }
        else ResponseHelper.responseJson(res, "cake did not save", null, 500);
    }

    async getCakesByUser(req: Request, res: Response) {
        const userId: string = req.query.userId as string;
        const user = await UserModel.findByPk(userId);

        if(!user?.dataValues?.id) {
            ResponseHelper.responseJson(res, "user no exists", null, 500);
            return;
        }

        const userCakes = await CakeModel.findAll({
            where: { userId },
            include: { model: CakeImageModel}
        });
        ResponseHelper.responseJson(res, "", MapCakeHelper.mapCakeList(userCakes));
    }
}