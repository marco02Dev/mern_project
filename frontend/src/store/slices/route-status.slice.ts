import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RouteStatusState {
  is404: boolean;
}

const initialState: RouteStatusState = {
  is404: false,
};

const routeStatusSlice = createSlice({
  name: "routeStatus",
  initialState,
  reducers: {
    setIs404: (state, action: PayloadAction<boolean>) => {
      state.is404 = action.payload;
    },
  },
});

export const { setIs404 } = routeStatusSlice.actions;
export default routeStatusSlice.reducer;
