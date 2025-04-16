import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../config/endpoints.config';

interface NonceState {
  value: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: NonceState = {
  value: null,
  loading: false,
  error: null,
};

export const initializeSession = createAsyncThunk(
  'nonce/initializeSession',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(endpoints.initSessionEndpoint, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Errore nel recupero della sessione');
      }

      const data = await response.json();
      return data.nonce as string;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const nonceSlice = createSlice({
  name: 'nonce',
  initialState,
  reducers: {
    clearNonce: (state) => {
      state.value = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeSession.fulfilled, (state, action: PayloadAction<string>) => {
        state.value = action.payload;
        state.loading = false;
      })
      .addCase(initializeSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearNonce } = nonceSlice.actions;

export default nonceSlice.reducer;
