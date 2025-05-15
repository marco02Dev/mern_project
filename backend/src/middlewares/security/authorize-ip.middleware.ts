import { getAuthorizedIps } from "../../utils/get-authorized-ips.util";
import { NextFunction, Response, Request } from "express";
import { sendErrorMessage } from "../../utils/send-error-massage.util";
import { RequestHandler } from "express";

export const checkAuthorizedIp: RequestHandler = (req, res, next) => {
  const xForwardedFor = req.headers['x-forwarded-for'] as string | undefined;
  const clientIp = xForwardedFor 
    ? xForwardedFor.split(',')[0].trim()
    : req.ip?.replace("::ffff:", "");

  const authorizedIps = getAuthorizedIps();

  console.log("Forwarded IP:", xForwardedFor);
  console.log("Selected client IP:", clientIp);
  console.log("Authorized IPs:", authorizedIps);

  if (clientIp && authorizedIps.includes(clientIp)) {
    console.log("Authorized IP:", clientIp);
    next();
  } else {
    console.warn("Unauthorized IP:", clientIp);
    sendErrorMessage({
      response: res,
      statusCode: 403
    });
  }
};