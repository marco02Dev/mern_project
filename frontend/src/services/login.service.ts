import { endpoints } from "../config/endpoints.config";
import { setLoggedIn } from "../store/slices/login.slice";
import { User } from "../types/user.types";
import { FormService } from "../types/service.type";
import { Dispatch } from "@reduxjs/toolkit";
import { isUserDataInvalid } from "../utils/is-user-data-invalid.util";

export const loginService: FormService = async (event, dispatch, navigateFunction): Promise<void> => {
    event?.preventDefault();
    if(event) {
        const form: HTMLFormElement = event?.currentTarget;
        const formData: FormData = new FormData(form);
        const loginEndpoint: string = `${endpoints.usersEndpoint}/login`;

        const name = formData.get('name');
        const surname = formData.get("surname");
        const email = formData.get('email');
        const password = formData.get("password");

        if(name && surname && email && password) {

            const user: User = {
                name: name as string,
                surname: surname as string,
                email: email as string,
                password: password as string
            };

            if (isUserDataInvalid(user)) {
                alert("I dati inseriti non sono validi.");
                return; 
            }

            try {
                const response = await fetch(loginEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });
                
                if(!response.ok) {
                    throw new Error("Errore nel login.");
                } else {
                    const json: any = await response.json();
                    const _id: string = json.data._id;
                    user._id = _id;

                    if(dispatch as Dispatch && dispatch !== undefined && navigateFunction) {
                        dispatch(setLoggedIn(user));
                        navigateFunction('/account')
                    }
                }
            } catch {
                throw new Error("Errore durante la richiesta di login."); 
            }

        } else {
            alert("Compila tutti i campi.");
        }
    }
}
