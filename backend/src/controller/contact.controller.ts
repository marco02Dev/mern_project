import { Controller } from "../types/controller.type";
import { Request, Response } from "express";
import { sendSuccessMessage } from "../utils/send-success-message.util";

export const sendEmail: Controller = async (req: Request, res: Response) => {
    sendSuccessMessage({response: res, statusCode: 200});
}