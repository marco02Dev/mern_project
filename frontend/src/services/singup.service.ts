import { Service } from "../types/service.type";
import { Endpoints, endpoints } from "../config/endpoints.config";

export const signUp: Service = async (event, dispatch): Promise<void> => {
    event.preventDefault();
    const { usersEndpoint }: Endpoints = endpoints
    
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const surname = formData.get('surname') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;
    console.log(name)

    try {
        const response = await fetch(`${usersEndpoint}/signup`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name: name,
                surname: surname,
                password: password,
                confirmPassword: confirmPassword
            })
        });

        if(!response.ok) {
            throw new Error("Failed to create a new user");
        } else {
            console.log("User created");
        }
    } catch(error) {
        console.log(error);
    }
}