import { Endpoints, endpoints } from "@client/config/endpoints.config";
import { User } from "@client/types/user.types";

type GetuserInfoData = {
    _id: string,
}

export const getUserPurchasedProducts = async ({ _id }: GetuserInfoData): Promise<string[] | null> => {
    const { usersEndpoint }: Endpoints = endpoints;
   
    try {
        const response = await fetch(`${usersEndpoint}/${_id}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error("User not found");
        } else {
            const json = await response.json();
            const data: User = json.data[0];

            if (data) {
                const purchasedProducts = data.purchasedProducts as string[];
                return purchasedProducts;
            } else {
                return null;
            }
        }

    } catch {
        throw new Error("User not found");
    }
}
