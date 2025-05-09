import { configureStore } from "@reduxjs/toolkit";
import appStateReducer from "./slices/app-state-slice";
import themeModeReducer from "./slices/theme-mode.slice"
import deviceReducer from "./slices/device.slice";
import menuReducer from "./slices/menu.slice";
import routeStatusReducer from "./slices/route-status.slice";
import loginReducer from "./slices/login.slice";
import purchasedProductsReducer from "./slices/purchased-products.slice";
import coursesDataChangedReducer from "./slices/courses-data-changed.slice";

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    themeMode: themeModeReducer,
    menu: menuReducer,
    device: deviceReducer,
    routeStatus: routeStatusReducer,
    login: loginReducer,
    purchasedProducts: purchasedProductsReducer,
    coursesDataChanged: coursesDataChangedReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
