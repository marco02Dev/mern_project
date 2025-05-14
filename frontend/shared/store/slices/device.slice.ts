import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DeviceState = {
  isMobile: boolean;
  isTablet: boolean;
};

const initialState: DeviceState = {
  isMobile: false,
  isTablet: false,
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDeviceState: (_state, action: PayloadAction<DeviceState>) => {
      return action.payload;
    },
  },
});

export const { setDeviceState } = deviceSlice.actions;
export default deviceSlice.reducer;