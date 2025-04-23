import { Service } from "../types/service.type";
import { setLoggedOut } from "../store/slices/login.slice";

export const logOutService: Service = async ({dispatch, navigate}) => {
    dispatch && dispatch(setLoggedOut());
    navigate && navigate("/login");
}