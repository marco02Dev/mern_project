import { Controller, UsersParams } from "../types/controller.type";
import { isUserDataInvalid } from "../utils/is-user-data-invalid.util";
import { sendErrorMessage } from "../utils/send-error-massage.util";
import { sendSuccessMessage } from "../utils/send-success-message.util";
import User, { UsersSchema } from "../models/users.model";
import { getAllDocumentsByModel } from "../queries/get-all-documents-by-model";
import { createNewDocumentByModel } from "../queries/create-new-document-by-model";
import { deleteDocumentByModel } from "../queries/delete-document-by-model";
import { getDocumentById } from "../queries/get-document-by-id";
import { Request } from "express";
import bcrypt from 'bcrypt';

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
                sendSuccessMessage({response: res, statusCode: 200, data:{_id: user._id as string}});
                return;
            }
        } catch(error) {
            console.log(`User ${name} ${surname} not found`);
            sendErrorMessage({response: res, statusCode: 404, resource: "User"});
            return;
        }
    }
}