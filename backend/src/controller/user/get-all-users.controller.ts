import { Controller } from "../../types/controller.type";
import User, { UsersSchema } from "../../models/users.model";
import { getAllDocumentsByModel } from "../../queries/get-all-documents-by-model";
import { Request } from "express";

export const getAllUsersController: Controller = async (req, res) => {
    getAllDocumentsByModel<UsersSchema>({
        Model: User,
        request: req as Request<{}, {}, UsersSchema>,
        response: res,
        resourceName: "Users"
    });
}