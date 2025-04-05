import { Controller, UsersParams } from "../types/controller.type";
import { isUserDataInvalid } from "../utils/is-user-data-invalid.util";
import { sendErrorMessage } from "../utils/send-error-massage.util";
import { sendSuccessMessage } from "../utils/send-success-message.util";
import User, { UsersSchema } from "../models/users.model";
import { getAllDocumentsByModel } from "../database/get-all-documents-by-model";
import { createNewDocumentByModel } from "../database/create-new-document-by-model";
import { deleteDocumentByModel } from "../database/delete-document-by-model";
import { Request } from "express";

export const getAllUsers: Controller = async (req, res) => {
    getAllDocumentsByModel<UsersSchema>({
        Model: User,
        request: req as Request<{}, {}, UsersSchema>,
        response: res,
        resourceName: "Users"
    });
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

export const logUserIntoAccount: Controller<UsersParams, {}, UsersSchema> = async (req, res) => {
    const user: UsersSchema = req.body;
    const {name, surname, email, password}: UsersSchema = user;

    if(isUserDataInvalid(user)) {
        sendErrorMessage({response: res, statusCode: 400});
        return;
    } else {
        try {
            const user = await User.findOne({ name, surname, email, password });
            if(user) {
                console.log(`User ${name} ${surname} logged in`);
                sendSuccessMessage({response: res, statusCode: 200});
                return;
            }
        } catch(error) {
            console.log(`User ${name} ${surname} not found`);
            sendErrorMessage({response: res, statusCode: 404, resource: "User"});
            return;
        }
    }
}