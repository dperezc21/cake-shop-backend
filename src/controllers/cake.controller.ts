import {Response , Request} from 'express';
import {CakeImage, CakeInterface} from "../interfaces/cake.interface";
import CakeModel from "../models/cake.model";
import UserModel from "../models/user.model";
import CakeImageModel from "../models/cake-image.model";

export class CakeController {

    async saveCake(req: Request, res: Response) {
        const { name, description, images }: CakeInterface = req.body;
        const userId: string = req.query.userId as string;

        const user = await UserModel.findByPk(userId);

        if(!user?.dataValues?.id) {
            res.status(500).json({
                message: "user no exists",
                result: null
            });
            return;
        }

        const cakeCreated = await CakeModel.create({
            name, description, userId: user.dataValues.id
        });

        if(cakeCreated) {
            const imageData = images.map((value: CakeImage) => {
                return {
                    url: value.url,
                    cakeId: cakeCreated.dataValues.id
                }
            });
            CakeImageModel.bulkCreate(imageData).then(console.log).catch(console.error);

            res.status(200).json({
                message: "cake saved",
                result: cakeCreated
            });
        }
        else res.status(500).json({
            message: "cake did not save",
            result: null
        });
    }

    async getCakesByUser(req: Request, res: Response) {
        const userId: string = req.query.userId as string;
        const user = await UserModel.findByPk(userId);

        if(!user?.dataValues?.id) {
            res.status(500).json({
                message: "user no exists",
                result: null
            });
            return;
        }

        const userCakes = await CakeModel.findAll({
            where: { userId }
        });

        res.status(200).json({
            message: "",
            result: userCakes
        })
    }
}