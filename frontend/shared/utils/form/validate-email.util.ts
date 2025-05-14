import validator from 'validator';

/**
 * Validates whether a given string is a properly formatted email address.
 *
 * This function uses the `validator` library to check if the input string matches
 * the standard format of an email address (e.g., user@example.com).
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns `true` if the email is valid, otherwise `false`.
 *
 * @example
 * validateEmail("test@example.com"); // true
 * validateEmail("invalid-email"); // false
*/

export const validateEmail = (email: string): boolean => {
  return validator.isEmail(email);
};