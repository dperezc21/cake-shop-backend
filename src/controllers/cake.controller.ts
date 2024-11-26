import {Request, Response} from 'express';
import {CakeInterface} from "../interfaces/cake.interface";
import CakeModel from "../models/cake.model";
import UserModel from "../models/user.model";
import CakeImageModel from "../models/cake-image.model";
import {MapCakeHelper} from "../helpers/map-cake.helper";
import {ResponseHelper} from "../helpers/response.helper";
import {CakeImageController} from "./cake-image.controller";
import OrganizationModel from "../models/organization.model";

const cakeImageController = new CakeImageController();

export class CakeController {

    async saveCake(req: Request, res: Response) {
        const { name, description, images }: CakeInterface = req.body;
        const organizationId: string = req.query.organizationId as string;

        const company = await OrganizationModel.findByPk(organizationId);

        if(!company?.dataValues?.id) {
            ResponseHelper.responseJson(res, "company no exists", null, 500);
            return;
        }

        const cakeCreated = await CakeModel.create({
            name, description, company_id: company.dataValues.id
        });

        if(cakeCreated) {
            cakeImageController.saveImagesCake(images, cakeCreated.dataValues.id)
            ResponseHelper.responseJson(res, "cake saved", MapCakeHelper.mapCake(cakeCreated));
        }
        else ResponseHelper.responseJson(res, "cake did not save", null, 500);
    }

    async getCakesByOrganization(req: Request, res: Response) {
        const organizationId: string = req.query.organizationId as string;
        const user = await OrganizationModel.findByPk(organizationId);

        if(!user?.dataValues?.id) {
            ResponseHelper.responseJson(res, "company no exists", null, 500);
            return;
        }

        const companyCakes = await CakeModel.findAll({
            where: { company_id: organizationId },
            include: { model: CakeImageModel }
        });
        ResponseHelper.responseJson(res, "", MapCakeHelper.mapCakeList(companyCakes));
    }
}