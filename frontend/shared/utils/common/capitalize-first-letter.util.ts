/**
 * Capitalizes the first letter of each word in a kebab-case string.
 *
 * This utility splits a string by hyphens (`-`), capitalizes the first letter of each word,
 * and joins them back with spaces. Useful for formatting slugs or CSS-style strings
 * into readable titles.
 *
 * @param {string} element - The kebab-case string to transform.
 * @returns {string} The formatted string with capitalized words and spaces.
 *
 * @example
 * capitalizeFirstLetter("web-development"); // returns "Web Development"
 * capitalizeFirstLetter("full-stack-engineer"); // returns "Full Stack Engineer"
*/

export const capitalizeFirstLetter = (element: string): string => {
    return element
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(' '); 
};
  