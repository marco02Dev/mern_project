import { authorizedIp } from "../config/env.config";
import { NextFunction, Response, Request } from "express";
import { sendErrorMessage } from "../utils/send-error-massage.util";

export const checkAthorizedIp = (request: Request<any>, response: Response, next: NextFunction) => {
    const clientIp = request.ip;

    if(authorizedIp === clientIp ) {
        console.log("Authorized Ip checked")
        next();
    } else {
        sendErrorMessage({
            response: response,
            statusCode: 403
        })
    }
}