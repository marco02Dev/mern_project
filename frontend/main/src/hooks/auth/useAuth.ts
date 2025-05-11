import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { User } from "../../types/user.types";
import { LoginState } from "../../store/slices/login.slice";

export type UseAuth = {
    isLoggedIn: boolean,
    userData: User,
    isAdmin: boolean
}

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