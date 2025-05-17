import { UsersSchema } from "@models/users.model";
import { validateEmail } from "@utils/validation/validate-email.util";
import { validatePassword } from "@utils/validation/validate-password.util";
import { isString } from "@utils/validation/is-string.util";

/**
 * Utility function mainly designed for controllers related to user login and creation.
 * It checks whether the provided user data is valid.
 *
 * The function validates that the user object contains non-empty `name`, `surname`, `email`, and `password` fields,
 * and ensures that `name` and `surname` are strings, `email` is valid, and `password` is strong.
 *
 * @param {UsersSchema} user - The user data object to validate.
 * @returns {boolean} Returns `true` if the user data is invalid (missing fields or incorrect types/format), otherwise `false`.
 *
 * @example
 * const user = { name: "John", surname: "Doe", email: "john@example.com", password: "Str0ng!Pass" };
 * isUserDataInvalid(user); // returns false
 *
 * const invalidUser = { name: "", surname: "Doe", email: "invalidemail", password: "weak" };
 * isUserDataInvalid(invalidUser); // returns true
*/

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