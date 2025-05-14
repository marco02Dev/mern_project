/**
 * Redirects the user to the login page after a short delay.
 *
 * This function initiates a redirection to the `/login` route after a delay of 1 second 
 * (1000 milliseconds). This could be useful for scenarios such as session expiration 
 * or redirecting a user after a specific action is completed.
 *
 * @returns {void}
 * 
 * @example
 * reloadLoginPage(); // Redirects to the login page after 1 second.
*/

export const reloadLoginPage = (): void => {
  setTimeout(() => {
    window.location.href = "/login";
  }, 1000);
};