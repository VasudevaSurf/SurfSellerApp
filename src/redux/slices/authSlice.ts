// src/redux/slices/authSlice.ts
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginApi} from '../../services/apiService';

interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  userData: any;
  error: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  isLoggedIn: false,
  userData: null,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await loginApi(email, password);

      if (response.result) {
        // Store user data in AsyncStorage
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify(response.vendor_data),
        );
        await AsyncStorage.setItem('isLoggedIn', 'true');
        return response;
      } else {
        return rejectWithValue(response.message || 'Login failed');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  },
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, {dispatch}) => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

      if (userData && isLoggedIn === 'true') {
        return {userData: JSON.parse(userData), isLoggedIn: true};
      }
      return {userData: null, isLoggedIn: false};
    } catch (error) {
      return {userData: null, isLoggedIn: false};
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, {dispatch}) => {
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('isLoggedIn');
    return true;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload.vendor_data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Check Auth Status
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.userData = action.payload.userData;
      })
      // Logout
      .addCase(logoutUser.fulfilled, state => {
        state.isLoggedIn = false;
        state.userData = null;
      });
  },
});

export const {clearError} = authSlice.actions;
export default authSlice.reducer;
