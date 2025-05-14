/**
 * Returns the current year as a string.
 *
 * This function retrieves the current year based on the system's date and returns it
 * as a string.
 *
 * @returns {string} The current year in string format.
 * 
 * @example
 * const currentYear = getCurrentYear();
 * console.log(currentYear); // Output: "2025" (or the current year)
*/

export const getCurrentYear = (): string => {
    return String(new Date().getFullYear());
};