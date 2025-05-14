import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserPurchasedProducts } from "../../../account/src/services/get-user-purchased-products.service";

export const fetchPurchasedProducts = createAsyncThunk(
  "purchasedProducts/fetch",
  async (_id: string, thunkAPI) => {
    try {
      const products = await getUserPurchasedProducts({ _id });
      return products;
    } catch {
      return thunkAPI.rejectWithValue(null);
    }
  }
);

interface PurchasedProductsState {
  products: string[] | null;
  loading: boolean;
  error: boolean;
}

const initialState: PurchasedProductsState = {
  products: null,
  loading: false,
  error: false,
};

const purchasedProductsSlice = createSlice({
  name: "purchasedProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchasedProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPurchasedProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchPurchasedProducts.rejected, (state) => {
        state.products = null;
        state.loading = false;
        state.error = true;
      });
  },
});

export default purchasedProductsSlice.reducer;
