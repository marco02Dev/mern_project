import { FormService } from "../types/service.type";
import { Endpoints, endpoints } from "../config/endpoints.config";
import { isUserDataInvalid } from "../utils/is-user-data-invalid.util";
import { User } from "../types/user.types";
import { setLoggedIn } from "../store/slices/login.slice";
import { Dispatch } from "@reduxjs/toolkit";

export const signUpService: FormService = async (event, dispatch, navigateFunction, setErrorMessage): Promise<void> => {
    event?.preventDefault();
    const { usersEndpoint }: Endpoints = endpoints;
    
    const form = event?.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const surname = formData.get('surname') as string;
    const password = formData.get('password') as string;
    const email = formData.get('email') as string;

    if (name && surname && password && email) {
        const user: User = { name, surname, password, email };

        if (isUserDataInvalid(user)) {
            setErrorMessage && setErrorMessage("Some fields are invalid or missing");
            throw new Error("Some fields are invalid or missing");
        }

        try {
            const response = await fetch(`${usersEndpoint}/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error("Failed to create a new user");
            }

            console.log("User created");

            const loginResponse = await fetch(`${usersEndpoint}/login`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(user)
            });

            if (!loginResponse.ok) {
                setErrorMessage && setErrorMessage("Signup succeeded but login failed.");
                throw new Error("Signup succeeded but login failed.");
            }

            const loginData = await loginResponse.json();
            const _id: string = loginData.data._id;
            user._id = _id;

            if (dispatch as Dispatch && navigateFunction) {
                dispatch && dispatch(setLoggedIn(user));
                navigateFunction('/account');
                console.log("User log in");
            }

        } catch (error) {
            setErrorMessage && setErrorMessage("An error occurred during signup or login.");
            throw new Error("An error occurred during signup or login.");
        }

    } else {
        setErrorMessage && setErrorMessage("Please fill in all the requested fields.");
        throw new Error("Please fill in all the requested fields.");
    }
};
