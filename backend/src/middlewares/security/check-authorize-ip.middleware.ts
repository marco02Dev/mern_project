import { getAuthorizedIps } from "../../utils/get-authorized-ips.util";
import { NextFunction, Response, Request } from "express";
import { sendErrorMessage } from "../../utils/send-error-massage.util";
import { RequestHandler } from "express";
import logger from "../../config/libraries/winston.config";

/**
 * `checkAuthorizedIp` is an **admin-only middleware** used to enhance security
 * by restricting access to specific IP addresses.
 * 
 * This middleware is designed primarily for admin-level endpoints or services
 * to prevent unauthorized requests from unknown or unsafe IP addresses.
 *
 * It checks the `X-Forwarded-For` header or falls back to the request IP,
 * and compares it against a list of authorized IPs defined in the system.
 * 
 * If the IP is authorized, it allows the request to proceed.
 * Otherwise, it sends a 403 Forbidden response using `sendErrorMessage`.
 * 
 * @param {Request} request - The Express HTTP request object.
 * @param {Response} response - The Express HTTP response object.
 * @param {NextFunction} next - The next middleware function in the stack.
*/

export const checkAuthorizedIp: RequestHandler = (request: Request<any>, response: Response, next: NextFunction) => {
  const xForwardedFor = request.headers['x-forwarded-for'] as string | undefined;
  const clientIp = xForwardedFor ? xForwardedFor.split(',')[0].trim() : request.ip?.replace("::ffff:", "");
  const authorizedIps = getAuthorizedIps();

  if (clientIp && authorizedIps.includes(clientIp)) {
    logger.info(`Authorized IP ${clientIp} accessed ${request.method} ${request.originalUrl}`);
    next();
  } else {
    logger.error(`Unauthorized IP ${clientIp || 'unknown'} attempted to access ${request.method} ${request.originalUrl}`);
    sendErrorMessage({
      response: response,
      statusCode: 403
    });
  }
};
