import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, updateOrder } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null,
  AllOrders: [],
  totalOrders: 0,
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    console.log(order)
    const response = await createOrder(order);
    return response.data;
  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort, pagination}) => {
    const response = await fetchAllOrders(sort, pagination);
    console.log(response.data)
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.AllOrders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex((order) => order.id === action.payload.id)
        if (index !== -1) {
          state.orders[index] = action.payload; // Update the order locally
        }
      });
  },
});

export const orderSelector = (state) => state.order.orders; 
export const totalOrdersSelector = (state) => state.order.totalOrders; 
export const AllOrdersSelector = (state) => state.order.AllOrders; 
export const currentOrderSelector = (state) => state.order.currentOrder; 
export const cartCurrentOrderSelector = (state) => state.order.cartCurrentOrder; 
export const {resetOrder, cardPaymentOrder} = orderSlice.actions;


const orderReducer = orderSlice.reducer;
export default orderReducer;
