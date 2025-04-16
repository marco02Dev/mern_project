import { Controller, UsersParams } from "../types/controller.type";
import { sendErrorMessage } from "../utils/send-error-massage.util";
import { sendSuccessMessage } from "../utils/send-success-message.util";
import User, { UsersSchema } from "../models/users.model";
import { getAllDocumentsByModel } from "../queries/get-all-documents-by-model";
import { createNewDocumentByModel } from "../queries/create-new-document-by-model";
import { deleteDocumentByModel } from "../queries/delete-document-by-model";
import { getDocumentById } from "../queries/get-document-by-id";
import { Request, response, Response } from "express";
import passport from "passport";
import { NextFunction } from "express";

export const getAllUsers: Controller = async (req, res) => {
    getAllDocumentsByModel<UsersSchema>({
        Model: User,
        request: req as Request<{}, {}, UsersSchema>,
        response: res,
        resourceName: "Users"
    });
}

export const getUserById: Controller = async (req, res) => {
    getDocumentById<UsersSchema>({
        Model: User,
        request: req as Request<{id: string}>,
        response: res,
        resourceName: "User"
    })
}

export const createUser: Controller<{}, {}, UsersSchema> = async (req, res) => {
    createNewDocumentByModel<UsersSchema>({
        Model: User,
        request: req,
        response: res,
        resourceName: "User"
    });
}

export const deleteUser: Controller<UsersParams, {}, UsersSchema> = async (req, res) => {
    deleteDocumentByModel<UsersSchema>({
        Model: User,
        request: req,
        response: res,
        resourceName: "User"
    });
}

export const logUserIntoAccount = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: Error, user: any ) => {
      if (err) return next(err);
  
      if (!user) {
        sendErrorMessage({
            response: res,
            statusCode: 400
        })
      }
  
      req.logIn(user, (err) => {
        if (err) return next(err);
        console.log("Sessione creata", req.sessionID);  
        return sendSuccessMessage({
            response: res,
            statusCode: 200,
            data: {
                _id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
            }
        });
      });
    })(req, res, next);
  };