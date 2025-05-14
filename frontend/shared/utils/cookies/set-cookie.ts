/**
 * Sets a browser cookie with a specified name, value, and expiration period.
 *
 * This utility function stores a cookie in the browser that persists for a given number
 * of days (defaults to 365). It automatically formats the expiration date in UTC format
 * and ensures the cookie is accessible site-wide.
 *
 * @param {string} name - The name of the cookie to set.
 * @param {string} value - The value to store in the cookie.
 * @param {number} [days=365] - The number of days until the cookie expires.
 *
 * @example
 * setCookie("themeMode", "dark", 30);
*/

export const setCookie = (name: string, value: string, days: number = 365): void => {
    const date: Date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); 
    const expires: string = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
};