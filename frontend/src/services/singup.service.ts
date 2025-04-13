import { FormService } from "../types/service.type";
import { Endpoints, endpoints } from "../config/endpoints.config";

export const signUpService: FormService = async (event): Promise<void> => {
    event?.preventDefault();
    const { usersEndpoint }: Endpoints = endpoints
    
    const form = event?.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const surname = formData.get('surname') as string;
    const password = formData.get('password') as string;
    const email = formData.get('email') as string;

    try {
        const response = await fetch(`${usersEndpoint}/signup`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name: name,
                surname: surname,
                email: email,
                password: password
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