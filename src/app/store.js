import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/ProductSlice';
import authReducer from '../features/Authorization/authSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/Orders/orderSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});
