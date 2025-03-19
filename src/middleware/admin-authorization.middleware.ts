import {NextFunction, Request, Response} from "express";
import {ResponseUtil} from "../utils/response.util";

export class AdminAuthorizationMiddleware {
    async verifyAdminUser(req: Request, res: Response, next: NextFunction) {
        const roleNameUser: string = req.body.roleAllowed;
        delete req.body.roleAllowed;
        if(roleNameUser == 'admin') next();
        else ResponseUtil.responseJson(res, "user role did not allow", "", 401);
    }
}