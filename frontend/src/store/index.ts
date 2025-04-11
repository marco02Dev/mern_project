import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slices/menu.slice";
import routeStatusReducer from "./slices/route-status.slice";
import loginReducer from "./slices/login.slice";
import productsPurchasedReducer from "./slices/purchased-products.slice"; // importa lo slice

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    routeStatus: routeStatusReducer,
    login: loginReducer,
    productsPurchased: productsPurchasedReducer, // aggiungi qui
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
