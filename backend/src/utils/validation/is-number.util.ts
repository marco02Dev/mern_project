/**
 * Utility function to check if the given data is a number.
 *
 * @param {any} data - The value to check.
 * @returns {boolean} True if `data` is of type number, otherwise false.
 *
 * @example
 * isNumber(123);   // true
 * isNumber("123"); // false
*/

export const isNumber = (data: any): boolean => typeof data === "number";