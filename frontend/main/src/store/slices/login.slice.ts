import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user.types";

export interface LoginState {
    isLoggedIn: boolean;
    user?: User
}

const initialState: LoginState = {
    isLoggedIn: false,
    user: undefined,
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLoggedIn: (
            state,
            action: PayloadAction<{
                _id: string, 
                name: string; 
                surname: string; 
                email: string, 
                role: string 
            }>
        ) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        setLoggedOut: (state) => {
            state.isLoggedIn = false;
            state.user = undefined;
        },
    },
});

export const { setLoggedIn, setLoggedOut } = loginSlice.actions;

export default loginSlice.reducer;
