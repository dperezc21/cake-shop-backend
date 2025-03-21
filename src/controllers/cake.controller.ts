import {Request, Response} from 'express';
import {CakeInterface} from "../interfaces/cake.interface";
import {MapCakeUtil} from "../utils/mappers/map-cake.util";
import {ResponseUtil} from "../utils/response.util";
import {CakeImageController} from "./cake-image.controller";
import OrganizationModel from "../models/organization.model";
import {CakeService} from "../services/cake.service";

const cakeImageController = new CakeImageController();
const cakeService = new CakeService();

export class CakeController {

    async saveCake(req: Request, res: Response) {
        const { name, description, images }: CakeInterface = req.body;
        const organizationId: string = req.query.organizationId as string;

        const company = await OrganizationModel.findByPk(organizationId);

        if(!company?.dataValues?.id) {
            ResponseUtil.responseJson(res, "company no exists", null, 500);
            return;
        }

        const cakeCreated = await cakeService.saveCake(name, description, company.dataValues.id);

        if(cakeCreated) {
            cakeImageController.saveImagesCake(images, cakeCreated.dataValues.id)
            ResponseUtil.responseJson(res, "cake saved", MapCakeUtil.mapCake(cakeCreated));
        }
        else ResponseUtil.responseJson(res, "cake did not save", null, 500);
    }

    async getCakesByOrganization(req: Request, res: Response) {
        try {
            const organizationId: string = req.query.organizationId as string;
            const companyCakes = await cakeService.getCakesOfOrganization(organizationId);
            ResponseUtil.responseJson(res, "", MapCakeUtil.mapCakeList(companyCakes));
        } catch(err) {
            ResponseUtil.responseJson(res, err, null, 500);
        }
    }

    async filterCake(req: Request, res: Response) {
        const name: string = req.query.name as string;
        const organizationId: number = req.query.organizationId as unknown as number;
        try {
            const findCakes = await cakeService.filterCakes(organizationId, name);
            ResponseUtil.responseJson(res, "", MapCakeUtil.mapCakeList(findCakes));
        } catch (err) {
            ResponseUtil.responseJson(res, "error", null, 500);
        }
    }
}