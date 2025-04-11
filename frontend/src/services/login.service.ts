import { endpoints } from "../config/endpoints.config";
import { setLoggedIn } from "../store/slices/login.slice";
import { User } from "../types/user.types";
import { Service } from "../types/service.type";
import { Dispatch } from "@reduxjs/toolkit";

export const login: Service = async (event, dispatch): Promise<void> => {
    event.preventDefault();
    const form: HTMLFormElement = event.currentTarget;
    const formData: FormData = new FormData(form);
    const loginEndpoint: string = `${endpoints.usersEndpoint}/login`

    const name = formData.get('name');
    const surname = formData.get("surname");
    const email = formData.get('email');
    const password = formData.get("password");

    if(name && surname && email && password ) {

        const user: User = {
            name: name as string,
            surname: surname as string,
            email: email as string,
            password: password as string
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
                throw new Error("Error");
            } else {
                const json: any = await response.json();
                const _id: string = json.data._id;
                user._id = _id;

                if(dispatch as Dispatch && dispatch !== undefined) {
                    dispatch(setLoggedIn(user));
                }
            }
        } catch {
            throw new Error("Error"); 
        }

    }
}