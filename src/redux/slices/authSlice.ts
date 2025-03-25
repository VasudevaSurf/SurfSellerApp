import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginApi} from '../../services/apiService';

interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  userData: any;
  error: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  isLoading: true, // Start with loading true
  isLoggedIn: false,
  userData: null,
  error: null,
  isInitialized: false,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await loginApi(email, password);
      console.log('Login Response:', JSON.stringify(response, null, 2));

      if (response.result) {
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify(response.vendor_data),
        );
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
      console.error('Auth check error:', error);
      return {userData: null, isLoggedIn: false};
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, {dispatch}) => {
    try {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('isLoggedIn');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    completeLogin: state => {
      state.isLoggedIn = true;
      // Store login state in AsyncStorage when completed
      AsyncStorage.setItem('isLoggedIn', 'true').catch(err =>
        console.error('Error saving login state:', err),
      );
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
        // Don't set isLoggedIn true here, we'll do it in completeLogin
        state.userData = action.payload.vendor_data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Check Auth Status
      .addCase(checkAuthStatus.pending, state => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = action.payload.isLoggedIn;
        state.userData = action.payload.userData;
        state.isInitialized = true;
      })
      .addCase(checkAuthStatus.rejected, state => {
        state.isLoading = false;
        state.isInitialized = true;
      })
      // Logout
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.userData = null;
      })
      .addCase(logoutUser.rejected, state => {
        state.isLoading = false;
        // Even if logout API fails, clear local state
        state.isLoggedIn = false;
        state.userData = null;
      });
  },
});

export const {clearError, completeLogin} = authSlice.actions;
export default authSlice.reducer;
