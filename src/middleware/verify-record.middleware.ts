import {ResponseUtil} from "../utils/response.util";
import {NextFunction, Request, Response} from "express";
import {OrganizationFoundError, UserFoundError} from "../utils/exceptions/record-found-error";
import {RegisterUserInterface} from "../interfaces/auth-user.interface";
import {OrganizationRegister} from "../interfaces/organization.interface";
import {RecordExistsService} from "../services/record-exists.service";

const recordExistsService = new RecordExistsService();

export default class VerifyRecordMiddleware {

    async verifyOrganizationExists(req: Request, res: Response, next: NextFunction) {
        const organizationId: string = req.query.organizationId as string;
        try {
            const findOrganization: boolean = await recordExistsService.organizationExistsById(organizationId);
            if(findOrganization) next();
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
            const findUser: boolean = await recordExistsService.userExistsByEmail(email);

            if(!findUser) next();
            else ResponseUtil.responseJson(res, "user found with same email", null, 400);
        } catch (err) {
            throw new UserFoundError("Error while search user by email");
        }

    }

    async organizationNameNotExists(req: Request, res: Response, next: NextFunction) {
        const { organizationName }: OrganizationRegister = req.body;
        try {
            const organizationExists: boolean = await recordExistsService.organizationExistsByName(organizationName);
            if(organizationExists) ResponseUtil.responseJson(res, "company name exists", null, 400);
            else next();
        } catch (err) {
            throw new OrganizationFoundError("Error while verify if company name exists");
        }
    }
}