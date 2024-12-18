import OrganizationModel from "../models/organization.model";
import {ResponseUtil} from "../utils/response.util";
import {NextFunction, Request, Response} from "express";
import {OrganizationFoundError, UserFoundError} from "../utils/exceptions/record-found-error";
import {RegisterUserInterface} from "../interfaces/auth-user.interface";
import UserModel from "../models/user.model";

export default class VerifyRecordMiddleware {

    async verifyOrganizationExists(req: Request, res: Response, next: NextFunction) {
        const organizationId: string = req.query.organizationId as string;
        try {
            const findOrganization = await OrganizationModel.findByPk(organizationId, {
                attributes: ['id'] });
            if(findOrganization?.dataValues?.id) next();
            else ResponseUtil.responseJson(res, "company no exists", null, 400);
        } catch (err) {
            throw new OrganizationFoundError("Error while verify if company exists");
        }
    }

    async verifyUserNotExists(req: Request, res: Response, next: NextFunction) {
        const { email }: RegisterUserInterface = req.body as RegisterUserInterface;

        try {
            if(!email) {
                ResponseUtil.responseJson(res, "email required", null);
                return ;
            }
            const findUser = await UserModel.findOne({ where: { email }, attributes: ['id'] });

            if(!findUser?.dataValues?.id) next();
            else ResponseUtil.responseJson(res, "user found with same email", null, 400);
        } catch (err) {
            throw new UserFoundError("Error while search user by email");
        }

    }
}