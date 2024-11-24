import {Response , Request} from 'express';
import {CakeInterface} from "../interfaces/cake.interface";
import CakeModel from "../models/cake.model";
import UserModel from "../models/user.model";

export class CakeController {

    async saveCake(req: Request, res: Response) {
        const { name, description }: CakeInterface = req.body;
        const userId: string = req.query.userId as string;

        const user = await UserModel.findByPk(userId);

        if(!user?.dataValues?.id) {
            res.status(500).json({
                message: "user no exists",
                result: null
            });
            return;
        }

        const createCake = await CakeModel.create({
            name, description, userId: user.dataValues.id
        });

        if(createCake) res.status(200).json({
            message: "cake saved",
            result: createCake
        });
        else res.status(500).json({
            message: "cake did not save",
            result: null
        });
    }
}