import { endpoints } from "@shared/config/endpoints.config";
import { setLoggedIn } from "@shared/store/slices/login.slice";
import { User } from "@shared/types/user.types";
import { FormService } from "@shared/types/service.type";
import { Dispatch } from "@reduxjs/toolkit";
import { isUserDataInvalid } from "@shared/utils/form/is-user-data-invalid.util";
import { sendErrorWhenHoneyPotIsFilled } from "@shared/utils/form/send-error-message-when-honey-pot-is-filled";
import { LoggedUser } from "@shared/types/user.types";
import { handleErrorResponse } from "@shared/utils/form/handle-error-response";

export const loginService: FormService = async (event, dispatch, navigateFunction, setErrorMessage): Promise<void> => {
    event?.preventDefault();
    if(event) {
        const form: HTMLFormElement = event?.currentTarget;
        const formData: FormData = new FormData(form);
        const loginEndpoint: string = `${endpoints.usersEndpoint}/login`;

        const name = formData.get('name');
        const surname = formData.get("surname");
        const email = formData.get('email');
        const password = formData.get("password");

        sendErrorWhenHoneyPotIsFilled({
            formData: formData,
            setErrorMessage: setErrorMessage
        });
        
        if(name && surname && email && password) {

            const user: User = {
                name: name as string,
                surname: surname as string,
                email: email as string,
                password: password as string
            };

            if (isUserDataInvalid(user)) {
                handleErrorResponse({ statusCode: 400, setErrorMessage });
            }

            try {
                const response = await fetch(loginEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include',
                    body: JSON.stringify(user)
                });
                
                if(!response.ok) {
                    if(setErrorMessage) setErrorMessage("Login failed. Please check your credentials and try again.");
                    throw new Error("Login failed. Please check your credentials and try again.");
                } else {
                    const json: any = await response.json();
                    const _id: string = json.data._id;
                    const role: string = json.data.role;
                    user._id = _id;
                    user.role = role;

                    if(dispatch as Dispatch && dispatch !== undefined && navigateFunction) {
                        dispatch(setLoggedIn(user as LoggedUser));
                        if(role === "admin") {
                            window.location.href = '/admin';
                        } else {
                            window.location.href = '/account';
                        }
                    }
                }
            } catch {
                if(setErrorMessage) setErrorMessage("Login failed. Please check your credentials and try again.");
                throw new Error("Login failed. Please check your credentials and try again.");
            }

        } else {
            handleErrorResponse({ statusCode: 400, setErrorMessage });
        }
    }
}
