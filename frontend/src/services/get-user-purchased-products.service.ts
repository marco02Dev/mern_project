import { endpoints, Endpoints } from "../config/endpoints.config";
import { User } from "../types/user.types";

type GetuserInfoData = {
    _id: string,
}

export const getUserPurchasedProducts = async ({_id}: GetuserInfoData): Promise<string[] | null> => {
    const { usersEndpoint }: Endpoints = endpoints;
   
    try {
        const response = await fetch(`${usersEndpoint}/${_id}`);

        if(!response.ok) {
            throw new Error("User not found");
        } else {
            const json = await response.json();
            const data: User = json.data[0];
            console.log(data);

            if(data) {
                const purchasedProducts = data.purchasedProducts as string[];
                console.log(purchasedProducts)
                return purchasedProducts         
            } else {
                return null
            }
        }

    } catch {
        throw new Error("User not found");
    }
}