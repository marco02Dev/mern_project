import { configureStore } from "@reduxjs/toolkit";
import themeModeReducer from "./slices/theme-mode.slice"
import menuReducer from "./slices/menu.slice";
import routeStatusReducer from "./slices/route-status.slice";
import loginReducer from "./slices/login.slice";
import purchasedProductsReducer from "./slices/purchased-products.slice";
import coursesDataChangedReducer from "./slices/courses-data-changed.slice";

export const store = configureStore({
  reducer: {
    themeMode: themeModeReducer,
    menu: menuReducer,
    routeStatus: routeStatusReducer,
    login: loginReducer,
    purchasedProducts: purchasedProductsReducer,
    coursesDataChanged: coursesDataChangedReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
