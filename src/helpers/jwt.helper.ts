import jwt from 'jsonwebtoken';
import {UserInterface} from "../interfaces/auth-user.interface";
import {SECRET_JSON_WEB_TOKEN} from "../config";

export class JwtHelper {

    createJWT = (payload: UserInterface): Promise<string> => {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, SECRET_JSON_WEB_TOKEN,
                { encoding: 'utf8', expiresIn: '10m'},
                (error, encoded) => {
                            if(error) reject(error)
                            resolve(encoded);
            });
        });
    }
}