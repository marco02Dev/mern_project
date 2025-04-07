import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slices/menu.slice";
import routeStatusReducer from "./slices/route-status.slice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    routeStatus: routeStatusReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
