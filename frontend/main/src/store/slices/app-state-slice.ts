import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = {
  loading: boolean;
  error: string | null;
}

const initialState: AppState = {
  loading: false,
  error: null,
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError } = appStateSlice.actions;
export default appStateSlice.reducer;
