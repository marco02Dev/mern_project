import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RouteStatusState {
  is404: boolean;
  isLoginPage: boolean;
}

const initialState: RouteStatusState = {
  is404: false,
  isLoginPage: false
};

const routeStatusSlice = createSlice({
  name: "routeStatus",
  initialState,
  reducers: {
    setIs404: (state, action: PayloadAction<boolean>) => {
      state.is404 = action.payload;
    },
    setIsLoginPage: (state, action: PayloadAction<boolean>) => {
      state.isLoginPage = action.payload;
    }
  },
});

export const { setIs404, setIsLoginPage } = routeStatusSlice.actions;
export default routeStatusSlice.reducer;
