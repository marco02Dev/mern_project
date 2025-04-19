import { athorizedIp } from "../config/env.config";
import { NextFunction, Response, Request } from "express";
import { sendErrorMessage } from "../utils/send-error-massage.util";

export const checkAthorizedIp = (request: Request, response: Response, next: NextFunction) => {
    const clientIp = request.ip;

    if(athorizedIp === clientIp ) {
        console.log("everything ok")
        next();
    } else {
        sendErrorMessage({
            response: response,
            statusCode: 403
        })
    }
}