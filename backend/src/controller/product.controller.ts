import { Request, Response } from "express";
import { sendSuccessMessage } from "../utils/send-success-message.util";
import { sendErrorMessage } from "../utils/send-error-massage.util";

export const uploadImageController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id, category } = req.params;   
    const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  
    const noFiles =
      !files ||
      (Array.isArray(files) ? files.length === 0 : Object.values(files).every(arr => arr.length === 0));
  
    if (!id || !category || noFiles) {
      sendErrorMessage({ response: res, statusCode: 400 });
      return;
    }
  
    sendSuccessMessage({ response: res, statusCode: 200 });
};