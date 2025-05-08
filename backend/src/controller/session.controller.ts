import { Request, Response } from "express";
import { sendSuccessMessage } from "../utils/send-success-message.util";
import { sendErrorMessage } from "../utils/send-error-massage.util";
import { LoggedUser } from "../types/logged-user.type";

export const checkUserSession = (req: Request, res: Response): any => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    const user = req.user as LoggedUser;
    console.log("User is authenticated")

    return sendSuccessMessage({
      response: res,
      statusCode: 200,
      data: {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
      }
    });
  } else {
    return sendErrorMessage({
      response: res,
      statusCode: 401,
    });
  }
};