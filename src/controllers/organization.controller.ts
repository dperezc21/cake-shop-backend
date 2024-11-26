import { Request, Response } from 'express';
import {OrganizationInterface} from "../interfaces/organization.interface";
import OrganizationModel from "../models/organization.model";
import {ResponseHelper} from "../helpers/response.helper";
import {MapOrganizationHelper} from "../helpers/map-organization.helper";
import UserModel from "../models/user.model";

export class OrganizationController {

    async saveOrganization(req: Request, res: Response) {
        const { name, phone, image, email }: OrganizationInterface = req.body;
        //const userId: string = req.params.userId;
        const findOrgByEmail = await OrganizationModel.findOne({
            where: {email}
        });
        if(findOrgByEmail?.dataValues?.id) {
            ResponseHelper.responseJson(res, "company exists with this email", null);
            return ;
        }
        /*const findUserForOrg = await UserModel.findByPk(userId);
        if(!findUserForOrg?.dataValues?.id) ResponseHelper.responseJson(res, "user for company no exists", null);*/
        const orgSaved = await OrganizationModel.create({
            name, phone, logo: image, email
        });
        if(orgSaved?.dataValues?.id) {
            //await UserModel.upsert({...findUserForOrg.dataValues, company_id: orgSaved?.dataValues?.id});
            ResponseHelper.responseJson(res, "company saved", MapOrganizationHelper.mapOrganization(orgSaved?.dataValues));
        }
        else ResponseHelper.responseJson(res, "company did not save", null);
    }

    /*async getOrganizationByUser(req: Request, res: Response) {
        const userId: string = req.params.userId;
        const getOrganization = await OrganizationModel.findOne({
            where: { email: 'moca@gmail.com'},
            include: {model: UserModel}
        })
            /!*await UserModel.findByPk(userId, {
            include: { model: OrganizationModel }
        });*!/

        res.json({
            getOrganization
        })
    }*/

}