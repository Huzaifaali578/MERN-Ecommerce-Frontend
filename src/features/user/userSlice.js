import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  userOrder } from './userAPL';

const initialState = {
  myOrder: [],
  status: 'idle',
};

export const userOrderAsync = createAsyncThunk(
  'user/userOrder',
  async (userId) => {
    console.log("userAsync", userId)
    const response = await userOrder(userId);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.myOrder = action.payload;
      });
  },
});

// export const { increment } = counterSlice.actions;

export const myOrderSelector = (state) => state.user.myOrder;

const userReducer = userSlice.reducer

export default userReducer;
