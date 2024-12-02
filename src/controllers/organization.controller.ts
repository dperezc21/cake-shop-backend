import {Request, Response} from 'express';
import {OrganizationInterface} from "../interfaces/organization.interface";
import OrganizationModel from "../models/organization.model";
import {ResponseUtil} from "../utils/response.util";
import {MapOrganizationUtil} from "../utils/mappers/map-organization.util";

export class OrganizationController {

    async saveOrganization(req: Request, res: Response) {
        const { name, phone, image, email, description }: OrganizationInterface = req.body;
        const findOrgByEmail = await OrganizationModel.findOne({
            where: {email}
        });
        if(findOrgByEmail?.dataValues?.id) {
            ResponseUtil.responseJson(res, "company exists with this email", null);
            return ;
        }
        const orgSaved = await OrganizationModel.create({ name, phone, logo: image, email, description });
        if(orgSaved?.dataValues?.id)
            ResponseUtil.responseJson(res, "company saved", MapOrganizationUtil.mapOrganization(orgSaved?.dataValues));
        else ResponseUtil.responseJson(res, "company did not save", null);
    }

    async getOrganizationById(req: Request, res: Response) {
        const organizationId: string = req.params.organizationId;
        const getOrganization = await OrganizationModel.findByPk(organizationId);

        if(getOrganization?.dataValues?.id)
            ResponseUtil.responseJson(res, "", MapOrganizationUtil.mapOrganization(getOrganization.dataValues));
        else ResponseUtil.responseJson(res, "company did not saved", null);
    }

    async getOrganizationsList(req: Request, res: Response) {
        const allOrganizations = await OrganizationModel.findAll();
        ResponseUtil.responseJson(res, "organization list", MapOrganizationUtil.mapOrganizationList(allOrganizations));
    }

    async getOrganizationByName(req: Request, res: Response) {
        const organizationName: string = req.params.name as string;
        if(!organizationName) {
            ResponseUtil.responseJson(res, "organization name empty", null, 201);
            return ;
        }

        const getOrganization = await OrganizationModel.findOne({
            where: { name: organizationName }
        });

        if(getOrganization?.dataValues?.id)
            ResponseUtil.responseJson(res, "organization", MapOrganizationUtil.mapOrganization(getOrganization.dataValues));
        else ResponseUtil.responseJson(res, "organization no exists", null);
    }

}