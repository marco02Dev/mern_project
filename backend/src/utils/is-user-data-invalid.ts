import { UsersSchema } from "../models/users.model";
import { validateEmail } from "./validate-email";
import { validatePassword } from "./validate-password";
import { isString } from "./is-string";

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