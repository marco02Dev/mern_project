import { Controller } from "../types/controller.type";
import User, { UsersSchema } from "../models/users.model";
import { getAllDocumentsByModel } from "../queries/get-all-documents-by-model";
import { getDocumentById } from "../queries/get-document-by-id";
import { Request } from "express";

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