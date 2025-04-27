import { NextFunction, Request, Response } from "express";
import { sendErrorMessage } from "../utils/send-error-massage.util";
import { RequestHandler } from "express";

export const rejectRequestIfHoneyPotIsFilled: RequestHandler = (request: Request, response: Response, next: NextFunction): void => {
    const { website } = request.body;

    if (website && website.trim() !== "") {
        sendErrorMessage({
            response: response,
            statusCode: 400
        });
    } else {
        next();
    }
}