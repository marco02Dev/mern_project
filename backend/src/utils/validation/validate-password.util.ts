import validator from 'validator';

/**
 * `validatePassword` is a utility function that checks if a given password
 * meets the following strength criteria:
 * - Minimum length of 8 characters
 * - At least 1 lowercase letter
 * - At least 1 uppercase letter
 * - At least 1 numeric digit
 * - At least 1 special symbol
 *
 * @param {string} password - The password string to validate.
 * @returns {boolean} True if the password meets all the above criteria, false otherwise.
 *
 * @example
 * validatePassword('Str0ng!Pass'); // returns true
 * validatePassword('weakpass');    // returns false
*/

export const validatePassword = (password: string): boolean => {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  });
};