import {Request, Response} from 'express';
import {RegisterUserInterface, UserInterface} from "../interfaces/auth-user.interface";
import UserModel from "../models/user.model";
import {AuthLoginUserInterface} from "../interfaces/auth-login-user.interface";
import {Model} from "sequelize";
import {ResponseUtil} from "../utils/response.util";
import {MapUserUtil} from "../utils/mappers/map-user.util";
import OrganizationModel from "../models/organization.model";

export class AuthUserController {
    async registerUser(req: Request, res: Response) {
        const organizationId: string = req.query.organizationId as string;
        const {name, lastName, password, phone, email}: RegisterUserInterface = req.body as RegisterUserInterface;
        const findOrganization = await OrganizationModel.findByPk(organizationId, {
            attributes: ['id'] });
        if(!findOrganization?.dataValues?.id) {
            ResponseUtil.responseJson(res, "company no exists", null);
            return ;
        }
        const creatingUser: Model = await UserModel.create({
            first_name: name, last_name: lastName, password, phone, email, company_id: findOrganization.dataValues.id
        });
        const responseUser: UserInterface = MapUserUtil.mapUser(creatingUser.dataValues);
        if(creatingUser) ResponseUtil.responseJson(res, "user registered", responseUser);

        else ResponseUtil.responseJson(res, "user did not register", null, 500);
    }

    async loginUser(req: Request, res: Response) {
        const {password, email} : AuthLoginUserInterface = req.query as any;
        const userFound: Model = await UserModel.findOne({
            where: { email, password }
        });
        const responseUser: UserInterface = MapUserUtil.mapUser(userFound.dataValues);
        if(userFound?.dataValues?.id) ResponseUtil.responseJson(res, "user found", responseUser);

        else ResponseUtil.responseJson(res, "user did not found", null, 404);
    }

    async deleteUser(req: Request, res: Response) {
        const userId: string = req.params.userId;
        const deleteUser: number = await UserModel.destroy({
            where: { id: userId }
        });

        if (deleteUser > 0) ResponseUtil.responseJson(res, "user deleted", deleteUser);
        else ResponseUtil.responseJson(res, "", null, 201);

    }
}