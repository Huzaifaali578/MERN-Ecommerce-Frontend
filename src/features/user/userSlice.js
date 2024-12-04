import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  fetchUserInfo, updateAddress, userOrder } from './userAPL';

const initialState = {
  myOrder: [],
  status: 'idle',
  userInfo : null
};

export const userOrderAsync = createAsyncThunk(
  'user/userOrder',
  async (userId) => {
    console.log("userAsync", userId)
    const response = await userOrder(userId);
    return response.data;
  }
);

export const updateUserAddressAsync = createAsyncThunk(
  'user/updateAddress',
  async (update) => {
    const response = await updateAddress(update);
    return response.data;
  }
);

export const fetchUserInfoAsync = createAsyncThunk(
  'user/fetchUserInfo',
  async (userId) => {
    const response = await fetchUserInfo(userId);
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
      })
      .addCase(fetchUserInfoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(updateUserAddressAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAddressAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
    },
  });
  
  // export const { increment } = counterSlice.actions;

export const myOrderSelector = (state) => state.user.myOrder;
export const userInfoSelector = (state) => state.user.userInfo;


const userReducer = userSlice.reducer

export default userReducer;
