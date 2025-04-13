import { Service } from "../types/service.type";
import { setLoggedOut } from "../store/slices/login.slice";

export const logOutService: Service = async ( event = null, dispatch, navigateFunction) => {
    dispatch && dispatch(setLoggedOut());
    navigateFunction && navigateFunction("/login");
}