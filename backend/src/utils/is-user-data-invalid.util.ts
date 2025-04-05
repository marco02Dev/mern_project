import { UsersSchema } from "../models/users.model";
import { validateEmail } from "./validate-email.util";
import { validatePassword } from "./validate-password.util";
import { isString } from "./is-string.util";

export const isUserDataInvalid = (user: UsersSchema): boolean => {
    if(user) {
        const {name, surname, email, password}: UsersSchema = user;
        const isMissingData: boolean = !name || !surname || !email || !password;
        const isEmail: boolean = validateEmail(email);
        const isStrongPassword: boolean = validatePassword(password);

        let isInvalid: boolean = isMissingData || !isString(name) || !isString(surname) || !isEmail || !isStrongPassword;

        if(isInvalid) {
            "User data is invalid"
        }

        return isInvalid;
    } else {
        return false
    }
}