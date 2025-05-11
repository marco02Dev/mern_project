import { Service } from "../types/service.type";
import { setLoggedOut } from "../store/slices/login.slice";
import { endpoints } from "../config/endpoints.config";
import { handleErrorResponse } from "../utils/form/handle-error-response";
import { destroySessionCookie } from "../utils/cookies/destroy-session-cookie.util";

export const logOutService: Service = async ({ dispatch, navigate }) => {
    const isAdmin: boolean = window.location.pathname.startsWith("/admin");

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
        if(isAdmin) {
            window.location.href = "/login";
        } else {
            if(navigate) navigate("/login");
        }
    } catch (error) {
        console.error(error);
        handleErrorResponse({ statusCode: 500 });
    }
};
