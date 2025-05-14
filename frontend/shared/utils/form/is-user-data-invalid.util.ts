import { User } from "../../types/user.types";
import { validateEmail } from "./validate-email.util";
import { validatePassword } from "./validate-password.util";
import { isString } from "./is-string.util";

/**
 * Validates whether a given `User` object contains all required and properly formatted fields.
 *
 * Checks include:
 * - Presence of `name`, `surname`, `email`, and `password`.
 * - Each of `name` and `surname` must be a valid string.
 * - `email` must be in a valid format.
 * - `password` must meet strong password requirements.
 *
 * @param {User} user - The user object to validate.
 * @returns {boolean} - Returns `true` if any user data is missing or invalid, otherwise `false`.
 *
 * @example
 * const user: User = { name: "John", surname: "Doe", email: "john@example.com", password: "SecureP@ss1" };
 * isUserDataInvalid(user); // false
 *
 * const invalidUser: User = { name: "", surname: "Doe", email: "not-an-email", password: "123" };
 * isUserDataInvalid(invalidUser); // true
*/

export const isUserDataInvalid = (user: User): boolean => {
    if(user) {
        const {name, surname, email, password}: User = user;
        const isMissingData: boolean = !name || !surname || !email || !password;
        const isEmail: boolean = validateEmail(email);
        let isStrongPassword: boolean = false;

        if(password) {
            isStrongPassword = validatePassword(password);
        }

        const isInvalid: boolean = isMissingData || !isString(name) || !isString(surname) || !isEmail || !isStrongPassword;

        return isInvalid;
    } else {
        return false
    }
}