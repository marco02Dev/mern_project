import { Controller } from "@custom-types/controller.type";
import { UsersSchema } from "@models/users.model";
import User from "@models/users.model";
import { UsersParams } from "@custom-types/controller.type";
import { deleteDocumentByModel } from "../../queries/delete-document-by-model";

export const deleteUserController: Controller<UsersParams, {}, UsersSchema> = async (req, res) => {
    deleteDocumentByModel<UsersSchema>({
        Model: User,
        request: req,
        response: res,
        resourceName: "User"
    });
}