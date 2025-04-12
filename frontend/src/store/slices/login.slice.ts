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
    name: "auth",
    initialState,
    reducers: {
        setLoggedIn: (
            state,
            action: PayloadAction<{ name: string; surname: string; email: string, password: string }>
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
