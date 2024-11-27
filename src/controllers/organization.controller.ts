import { Request, Response } from 'express';
import {OrganizationInterface} from "../interfaces/organization.interface";
import OrganizationModel from "../models/organization.model";
import {ResponseHelper} from "../helpers/response.helper";
import {MapOrganizationHelper} from "../helpers/map-organization.helper";

export class OrganizationController {

    async saveOrganization(req: Request, res: Response) {
        const { name, phone, image, email, description }: OrganizationInterface = req.body;
        const findOrgByEmail = await OrganizationModel.findOne({
            where: {email}
        });
        if(findOrgByEmail?.dataValues?.id) {
            ResponseHelper.responseJson(res, "company exists with this email", null);
            return ;
        }
        const orgSaved = await OrganizationModel.create({ name, phone, logo: image, email, description });
        if(orgSaved?.dataValues?.id)
            ResponseHelper.responseJson(res, "company saved", MapOrganizationHelper.mapOrganization(orgSaved?.dataValues));
        else ResponseHelper.responseJson(res, "company did not save", null);
    }

    async getOrganizationById(req: Request, res: Response) {
        const organizationId: string = req.params.organizationId;
        const getOrganization = await OrganizationModel.findByPk(organizationId);

        if(getOrganization.dataValues.id)
            ResponseHelper.responseJson(res, "", MapOrganizationHelper.mapOrganization(getOrganization.dataValues));
        else ResponseHelper.responseJson(res, "company did not saved", null);
    }

    async getOrganizationsList(req: Request, res: Response) {
        const allOrganizations = await OrganizationModel.findAll();
        ResponseHelper.responseJson(res, "organization list", MapOrganizationHelper.mapOrganizationList(allOrganizations));
    }

}