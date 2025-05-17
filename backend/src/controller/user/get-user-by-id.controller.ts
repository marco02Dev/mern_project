import { Controller } from "@custom-types/controller.type";
import User, { UsersSchema } from "@models/users.model";
import { getDocumentById } from "../../queries/get-document-by-id";
import { Request } from "express";

export const getUserByIdController: Controller = async (req, res) => {
    getDocumentById<UsersSchema>({
        Model: User,
        request: req as Request<{id: string}>,
        response: res,
        resourceName: "User"
    })
}