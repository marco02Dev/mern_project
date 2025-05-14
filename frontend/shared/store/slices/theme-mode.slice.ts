import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultMode } from '@shared/config/theme-mode.config';

type ThemeModeState = {
  mode: string;
};

const initialState: ThemeModeState = {
  mode: defaultMode,
};

const themeModeSlice = createSlice({
  name: 'themeMode',
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<string>) {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = themeModeSlice.actions;
export default themeModeSlice.reducer;
