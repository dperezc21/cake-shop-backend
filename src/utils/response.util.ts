import { Response } from 'express';

export class ResponseUtil {

    static responseJson(res: Response, message: string, result: any, status: number = 200, token: string =""): void {
        res.status(status).json({
            message: message,
            result, token
        })
    }

}