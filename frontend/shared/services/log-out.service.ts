import { Dispatch } from "@reduxjs/toolkit";
import { setLoggedOut } from "../store/slices/login.slice";
import { endpoints } from "../config/endpoints.config";
import { handleErrorResponse } from "../utils/form/handle-error-response";
import { destroySessionCookie } from "../utils/cookies/destroy-session-cookie.util";

/**
 * Represents the type for the logout service function.
 * 
 * @param {object} args - The arguments for the logout service.
 * @param {Dispatch} args.dispatch - The Redux dispatch function used to dispatch actions.
 * 
 * @returns {Promise<void>} A promise that resolves when the logout process is complete.
*/

export type LogoutService = (args: {
    dispatch: Dispatch;
}) => Promise<void>;

/**
 * A service function to log out a user.
 * 
 * It sends a request to the backend to log out the user, handles errors, removes session cookies, 
 * dispatches a `setLoggedOut` action to update the Redux store, and then redirects the user to the login page.
 * 
 * @param {object} args - The arguments for logging out.
 * @param {Dispatch} args.dispatch - The Redux dispatch function to update the login state.
 * 
 * @returns {Promise<void>} A promise that resolves when the logout process is complete.
 * 
 * @throws {Error} Throws an error if the logout request fails.
 * 
 * @example
 * // Usage example
 * const handleLogout = async () => {
 *   await logOutService({ dispatch });
 * };
*/

export const logOutService: LogoutService = async ({ dispatch }) => {
    try {
        const response = await fetch(`${endpoints.usersEndpoint}/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            handleErrorResponse({ statusCode: response.status });
            return;
        }

        destroySessionCookie();

        if(dispatch) dispatch(setLoggedOut());
        window.location.href = "/login";
    } catch (error) {
        console.error(error);
        handleErrorResponse({ statusCode: 500 });
    }
};
