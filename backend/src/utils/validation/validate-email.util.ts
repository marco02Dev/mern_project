import validator from 'validator';

/**
 * `validateEmail` is a utility function that validates if a given string
 * is a properly formatted email address.
 *
 * @param {string} email - The email address string to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 *
 * @example
 * validateEmail('test@example.com'); // returns true
 * validateEmail('invalid-email'); // returns false
*/

export const validateEmail = (email: string): boolean => {
  return validator.isEmail(email);
};