import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserPurchasedProducts } from "../../services/get-user-purchased-products.service"; // ✅ Usa la tua funzione
import { RootState } from "../index";

interface ProductsPurchasedState {
  products: string[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsPurchasedState = {
  products: null,
  loading: false,
  error: null,
};

// ✅ Thunk che usa la tua funzione
export const fetchUserPurchasedProducts = createAsyncThunk<
  string[] | null,
  string,
  { rejectValue: string }
>("productsPurchased/fetch", async (_id, { rejectWithValue }) => {
  try {
    const products = await getUserPurchasedProducts({ _id });
    return products;
  } catch (err: any) {
    return rejectWithValue(err.message || "Errore nel fetch dei prodotti");
  }
});

const productsPurchasedSlice = createSlice({
  name: "productsPurchased",
  initialState,
  reducers: {
    clearProductsPurchased: (state) => {
      state.products = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPurchasedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPurchasedProducts.fulfilled, (state, action: PayloadAction<string[] | null>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchUserPurchasedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Errore sconosciuto";
      });
  },
});

export const { clearProductsPurchased } = productsPurchasedSlice.actions;
export default productsPurchasedSlice.reducer;
