import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slices/menu.slice";
import routeStatusReducer from "./slices/route-status.slice";
import loginReducer from "./slices/login.slice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    routeStatus: routeStatusReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
