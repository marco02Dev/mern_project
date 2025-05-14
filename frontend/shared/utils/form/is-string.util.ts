/**
 * Checks if the given value is a string.
 *
 * @param {unknown} data - The value to check.
 * @returns {boolean} - Returns `true` if the value is of type string, otherwise `false`.
 *
 * @example
 * isString("hello"); // true
 * isString(123);     // false
*/

export const isString = (data: unknown): boolean => typeof data === "string";