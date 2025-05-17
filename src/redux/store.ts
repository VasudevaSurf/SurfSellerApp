import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import productDetailsReducer from './slices/productDetailsSlice';
import ordersReducer from './slices/ordersSlice';
import orderDetailsReducer from './slices/orderDetailsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    orders: ordersReducer,
    orderDetails: orderDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
