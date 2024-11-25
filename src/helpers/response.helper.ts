import { Response } from 'express';

export class ResponseHelper {

    static responseJson(res: Response, message: string, result: any, status: number = 200): void {
        res.status(status).json({
            message: message,
            result
        })
    }

}