import {Request, Response} from 'express';
import {OrganizationInterface, OrganizationRegister} from "../interfaces/organization.interface";
import OrganizationModel from "../models/organization.model";
import {ResponseUtil} from "../utils/response.util";
import {MapOrganizationUtil} from "../utils/mappers/map-organization.util";
import {UserService} from "../services/userService";
import {RegisterUserInterface} from "../interfaces/auth-user.interface";
import {OrganizationService} from "../services/organization.service";

const userService = new UserService();
const organizationService = new OrganizationService();

export class OrganizationController {

    /**
     * @deprecated
     * @param req
     * @param res
     */
    async saveOrganization(req: Request, res: Response) {
        const { organizationName, phone, image, email, description }: OrganizationInterface = req.body;
        const findOrgByEmail = await organizationService.organizationByEmail(email);
        if(findOrgByEmail?.dataValues?.id) {
            ResponseUtil.responseJson(res, "company exists with this email", null);
            return ;
        }
        const orgSaved = await organizationService.saveOrganization({ organizationName: organizationName, phone, image, email, description });
        if(orgSaved?.dataValues?.id)
            ResponseUtil.responseJson(res, "company saved", MapOrganizationUtil.mapOrganization(orgSaved?.dataValues));
        else ResponseUtil.responseJson(res, "company did not save", null);
    }

    async saveOrganizationWithUser(req: Request, res: Response) {
        const { organizationName, organizationEmail, userName, email, phone, description, ...dataUser  }: OrganizationRegister = req.body;
        const userToRegister: RegisterUserInterface = {
            ...dataUser, name: userName, role: "admin", phone, email
        }
        try {
            const findOrgByEmail = await organizationService.organizationByEmail(organizationEmail);
            if(findOrgByEmail?.dataValues?.id) {
                ResponseUtil.responseJson(res, "company exists with this email", null);
                return ;
            }
            const orgSaved = await organizationService.saveOrganization({ organizationName: organizationName, phone, email: organizationEmail, description })

            if(!orgSaved?.dataValues?.id) ResponseUtil.responseJson(res, "company did not save", null);
            else {
                await userService.createUser(orgSaved.dataValues.id, userToRegister);
                ResponseUtil.responseJson(res, "company saved", MapOrganizationUtil.mapOrganization(orgSaved?.dataValues));
            }
        } catch (err) {
            ResponseUtil.responseJson(res, "err while create company with user", null, 500);
        }
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

        const getOrganization = await organizationService.organizationByName(organizationName);

        if(getOrganization?.dataValues?.id)
            ResponseUtil.responseJson(res, "organization", MapOrganizationUtil.mapOrganization(getOrganization.dataValues));
        else ResponseUtil.responseJson(res, "organization no exists", null);
    }

    async updateOrganization(req: Request, res: Response) {
        const organizationId: string = req.params.organizationId as string;
        let { id, ...organization }: OrganizationInterface = req.body as OrganizationInterface;
        try {
            const organizationWithSameName: boolean = await organizationService.organizationWithNameExists(organizationId, organization.organizationName);

            if(organizationWithSameName) {
                ResponseUtil.responseJson(res, "organization with this name exists yet", null);
                return ;
            }

            const updateOrganization = await organizationService.updateOrganization(organizationId, organization);

            if(updateOrganization) ResponseUtil.responseJson(res, "organization updated", {
                id: organizationId, ...organization
            });
            else ResponseUtil.responseJson(res, "organization did not update", null);
        } catch (err) {
            ResponseUtil.responseJson(res, "error in update organization", null, 500);
        }
    }

}