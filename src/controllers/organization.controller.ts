import { Request, Response } from 'express';
import {OrganizationInterface} from "../interfaces/organization.interface";
import OrganizationModel from "../models/organization.model";
import {ResponseHelper} from "../helpers/response.helper";
import {MapOrganizationHelper} from "../helpers/map-organization.helper";

export class OrganizationController {

    async saveOrganization(req: Request, res: Response) {
        const { name, phone, image, email }: OrganizationInterface = req.body;
        const findOrgByEmail = await OrganizationModel.findOne({
            where: {email}
        });
        if(findOrgByEmail?.dataValues?.id) ResponseHelper.responseJson(res, "company exists with this email", null);

        const orgSaved = await OrganizationModel.create({
            name, phone, logo: image, email
        });
        if(orgSaved?.dataValues?.id) ResponseHelper.responseJson(res, "company saved", MapOrganizationHelper.mapOrganization(orgSaved?.dataValues));
        else ResponseHelper.responseJson(res, "company did not save", null, 500);
    }

}