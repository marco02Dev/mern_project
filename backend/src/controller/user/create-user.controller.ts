import { Controller } from "@custom-types/controller.type";
import { UsersSchema } from "@models/users.model";
import { isUserDataInvalid } from "@utils/validation/is-user-data-invalid.util";
import { sendErrorMessage } from "@utils/response/send-error-massage.util";
import { isUserAlreadyExists } from "@utils/queries/is-user-already-exists.query";
import { createNewDocumentByModel } from "@utils/queries/create-new-document-by-model";
import User from "@models/users.model";
import bcrypt from 'bcrypt';

export const createUserController: Controller<{}, {}, UsersSchema> = async (req, res) => {
    const clientData: any = req.body;
    delete (clientData as any).role;

    if (isUserDataInvalid(clientData)) {
        sendErrorMessage({ response: res, statusCode: 400 });
        return;
    }

    const emailExists = await isUserAlreadyExists(clientData.email);

    if (emailExists) {
        sendErrorMessage({ response: res, statusCode: 409 });
        return;
    }

    const hashedPassword = await bcrypt.hash(clientData.password, 10);
    clientData.password = hashedPassword;

    await createNewDocumentByModel<UsersSchema>({
        Model: User,
        clientData,
        response: res,
        resourceName: "User"
    });
};
