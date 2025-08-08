import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import productDetailsReducer from './slices/productDetailsSlice';
import ordersReducer from './slices/ordersSlice';
import orderDetailsReducer from './slices/orderDetailsSlice';
import profileReducer from './slices/profileSlice';
import initializerReducer from './slices/initializerSlice';
import categoriesReducer from './slices/categoriesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    orders: ordersReducer,
    orderDetails: orderDetailsReducer,
    profile: profileReducer,
    initializer: initializerReducer,
    categories: categoriesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
