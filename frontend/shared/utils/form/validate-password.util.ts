import validator from 'validator';

/**
 * Validates whether a password is strong based on predefined security rules.
 *
 * Uses the `validator` library's `isStrongPassword` function to check that
 * the password includes at least:
 * - 8 characters
 * - 1 lowercase letter
 * - 1 uppercase letter
 * - 1 number
 * - 1 symbol
 *
 * @param {string} password - The password string to validate.
 * @returns {boolean} `true` if the password meets all strength criteria, otherwise `false`.
 *
 * @example
 * validatePassword('Test@1234'); // returns true
 * validatePassword('weak');      // returns false
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