/**
 * Utility function to check if a given value is a string.
 *
 * @param {any} data - The data to check.
 * @returns {boolean} True if the data is of type string, false otherwise.
 *
 * @example
 * isString("hello"); // returns true
 * isString(123);     // returns false
*/

export const isString = (data: any): boolean => typeof data === "string";