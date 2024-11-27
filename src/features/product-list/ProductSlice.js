import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductByFilter } from './ProductAPI';

const initialState = {
  products: [],
  status: 'idle', // 'idle' | 'loading' | 'failed'
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // console.log(response.data)
    return response.data; // The `data` object from the API
  }
);


export const fetchAllProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductByFilter",
  async ({ filter, sort }) => {
    console.log("Async Filter:", filter);
    console.log("Async Sort:", sort);

    const response = await fetchProductByFilter({ filter, sort });
    return response.data; // The `data` object from the API
  }
);


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
        // console.log(action.payload)
      })
      .addCase(fetchAllProductsAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchAllProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
        // console.log(action.payload)
      })
      .addCase(fetchAllProductsByFilterAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const productSelector = (state) => state.product.products;
export const productStatusSelector = (state) => state.product.status;

export default productSlice.reducer;
