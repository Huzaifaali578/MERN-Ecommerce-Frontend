import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, updateAddress } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error: null,
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (loggedInData) => {
    const response = await createUser(loggedInData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo) => {
    console.log(loginInfo)
    const response = await checkUser(loginInfo);
    console.log(response.data)
    return response.data;
  }
);

export const updateAddressAsync = createAsyncThunk(
  'user/updateAddress',
  async (update) => {
    const response = await updateAddress(update);
    return response.data;
  }
);



export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(updateAddressAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAddressAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(updateAddressAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      });
  },
});



export const loggedInUserSelector = (state) => state.auth.loggedInUser;
export const errorSelector = (state) => state.auth.error;
const authReducer = authSlice.reducer
export default authReducer;
