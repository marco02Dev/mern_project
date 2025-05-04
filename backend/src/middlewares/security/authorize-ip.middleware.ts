import { getAuthorizedIps } from "../../utils/get-authorized-ips.util";
import { NextFunction, Response, Request } from "express";
import { sendErrorMessage } from "../../utils/send-error-massage.util";
import { RequestHandler } from "express";

export const checkAthorizedIp: RequestHandler = (request: Request<any>, response: Response, next: NextFunction) => {
    const clientIp = request.ip?.replace("::ffff:", ""); 
    const authorizedIps = getAuthorizedIps(); 
    console.log(clientIp)

    if (clientIp && authorizedIps.includes(clientIp)) {
        console.log("Authorized IP:", clientIp);
        next();
    } else {
        console.warn("Unauthorized IP:", clientIp);
        sendErrorMessage({
            response: response,
            statusCode: 403
        });
    }
};
