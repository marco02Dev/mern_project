import { getAuthorizedIps } from "../../utils/get-authorized-ips.util";
import { NextFunction, Response, Request } from "express";
import { sendErrorMessage } from "../../utils/send-error-massage.util";
import { RequestHandler } from "express";

export const checkAthorizedIp: RequestHandler = (request: Request<any>, response: Response, next: NextFunction) => {
  const xForwardedFor = request.headers['x-forwarded-for'] as string | undefined;
  const clientIp = xForwardedFor ? xForwardedFor.split(',')[0].trim() : request.ip?.replace("::ffff:", "");
  const authorizedIps = getAuthorizedIps();

  console.log("Client IP:", clientIp);
  console.log("Authorized IPs:", authorizedIps);
  console.log("Raw request.ip:", request.ip);
  console.log("x-forwarded-for header:", xForwardedFor);

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
