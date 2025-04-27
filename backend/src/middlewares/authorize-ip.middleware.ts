import { authorizedIp } from "../config/env.config";
import { NextFunction, Response, Request } from "express";
import { sendErrorMessage } from "../utils/send-error-massage.util";
import { RequestHandler } from "express";

export const checkAthorizedIp: RequestHandler = (request: Request<any>, response: Response, next: NextFunction) => {
    const clientIp = request.ip;

    if(authorizedIp === clientIp ) {
        console.log("Authorized Ip checked")
        next();
    } else {
        console.log("Unothrized")
        sendErrorMessage({
            response: response,
            statusCode: 403
        })
    }
}