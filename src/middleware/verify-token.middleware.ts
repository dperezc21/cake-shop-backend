import {NextFunction, Request, Response} from "express";
import jwt, {VerifyErrors} from 'jsonwebtoken';
import {UserService} from "../services/userService";
import {SECRET_JSON_WEB_TOKEN} from "../config";
import {UserInterface} from "../interfaces/auth-user.interface";
import {ResponseUtil} from "../utils/response.util";

const userService: UserService = new UserService();

export class VerifyTokenMiddleware {
    async verifyUserToken(req: Request, res: Response, next: NextFunction) {
        const token: string = req?.headers['authorization']?.split(" ")[1];
        try {
            if(!token) {
                ResponseUtil.responseJson(res, "No token provided", "", 401);
                return ;
            }
            jwt.verify(token, SECRET_JSON_WEB_TOKEN, async(err: VerifyErrors, result) =>{
               if(err) ResponseUtil.responseJson(res, "token did not authenticated", "", 401);
                else {
                   const jwtPayload: UserInterface = result as UserInterface;
                   req.body.roleAllowed = jwtPayload?.id ? jwtPayload?.role : "";
                   const user = await userService.findUserByd(jwtPayload.id.toString());
                   if(!user?.dataValues?.id) ResponseUtil.responseJson(res, "user not authenticated", "", 401);
                   else next();
               }
            });
        } catch(err) {
            ResponseUtil.responseJson(res, "Error unexpected while valid user authentication", null, 500);
        }
    }
}