import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductByFilter, fetchCategory, fetchBrand, fetchProductById } from './ProductAPI';

const initialState = {
  products: [],
  status: 'idle', // 'idle' | 'loading' | 'failed'
  totalItems: 0,
  categories: [],
  categoriesStatus: 'idle',
  brands: [],
  brandsStatus: 'idle',
  productDetailById: null
};

export const fetchAllProductsByFilterAsync = createAsyncThunk(
  'product/fetchProductByFilter',
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductByFilter({ filter, sort, pagination });
    return response.data; // Assuming response includes { data, totalItems }
  }
);

export const fetchCategoryAsync = createAsyncThunk(
  'product/fetchCategory',
  async () => {
    const response = await fetchCategory();
    return response.data;
  }
);

export const fetchBrandAsync = createAsyncThunk(
  'product/fetchBrand',
  async () => {
    const response = await fetchBrand();
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    // console.log(id)
    const response = await fetchProductById(id);
    // console.log(response.data)
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products by Filter
      .addCase(fetchAllProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.data;
        state.totalItems = action.payload.items;
      })
      .addCase(fetchAllProductsByFilterAsync.rejected, (state, action) => {
        state.status = 'failed';
      })
      // Fetch Categories
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.categoriesStatus = 'loading';
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.categoriesStatus = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchCategoryAsync.rejected, (state, action) => {
        state.categoriesStatus = 'failed';
      })
      // Fetch Brands
      .addCase(fetchBrandAsync.pending, (state) => {
        state.brandsStatus = 'loading';
      })
      .addCase(fetchBrandAsync.fulfilled, (state, action) => {
        state.brandsStatus = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchBrandAsync.rejected, (state, action) => {
        state.brandsStatus = 'failed';
      })
      // Fetch ProductById
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.productDetailById = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

// Selectors
export const productSelector = (state) => state.product.products;
export const totalItemsSelector = (state) => state.product.totalItems;
export const categorySelector = (state) => state.product.categories;
export const brandSelector = (state) => state.product.brands;
export const productStatusSelector = (state) => state.product.status;
export const categoriesStatusSelector = (state) => state.product.categoriesStatus;
export const brandsStatusSelector = (state) => state.product.brandsStatus;
export const productDetailByIdSelector = (state) => state.product.productDetailById;


export default productSlice.reducer;
