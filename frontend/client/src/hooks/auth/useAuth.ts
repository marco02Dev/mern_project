import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { User } from "../../types/user.types";
import { LoginState } from "../../store/slices/login.slice";

/**
 * Represents the result of the useAuth hook.
 * 
 * @property isLoggedIn Indicates whether the user is currently authenticated.
 * @property userData The current user's data, with empty string values used as defaults for missing fields.
 * @property isAdmin Indicates whether the current user has admin privileges.
*/

export type UseAuth = {
    isLoggedIn: boolean,
    userData: User,
    isAdmin: boolean
}

/**
 * Custom hook that returns authentication-related state from the Redux store.
 * 
 * @returns An object containing:
 * - `isLoggedIn`: boolean indicating whether the user is authenticated
 * - `userData`: normalized user data with empty string values used as defaults if fields are undefined
 * - `isAdmin`: boolean indicating whether the user has admin privileges
*/

export const useAuth = (): UseAuth => {
    const { isLoggedIn, user }: LoginState = useSelector((state: RootState) => state.login);
    const safeUser = user as User | undefined;

    const userData: User = {
        _id: safeUser?._id || "",
        name: safeUser?.name || "",
        surname: safeUser?.surname || "",
        email: safeUser?.email || "",
        purchasedProducts: safeUser?.purchasedProducts || [],
        role: safeUser?.role || "",
    };

    const isAdmin = userData.role === "admin";

    return {
        isLoggedIn,
        userData,
        isAdmin,
    };
};