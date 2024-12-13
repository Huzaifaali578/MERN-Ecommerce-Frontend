import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAuth, createUser, loginUser, signOut } from './authAPI';
// import { updateAddress } from '../user/userAPL';

const initialState = {
  loggedInUserToken: null,
  status: 'idle',
  error: null,
  checkUserAuth : false
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (loggedInData) => {
    const response = await createUser(loggedInData);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo, {rejectWithValue}) => {
 try {
    const response = await loginUser(loginInfo);
    return response.data;
 } catch (error) {
   console.log(error)
    return rejectWithValue(error)
  }
 }
);

export const checkAuthAsync = createAsyncThunk(
  'user/checkAuth',
  async () => {
 try {
    const response = await checkAuth();
    return response.data;
 } catch (error) {
   console.log(error)
  }
 }
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async () => {
    const response = await signOut();
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
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.checkUserAuth = true
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
        state.checkUserAuth = true
      })
  },
});



export const loggedInUserSelector = (state) => state.auth.loggedInUserToken;
export const errorSelector = (state) => state.auth.error;
export const checkUserAuthSelector = (state) => state.auth.checkUserAuth;
const authReducer = authSlice.reducer
export default authReducer;
