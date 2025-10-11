import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchInitializerApi,
  InitializerResponse,
} from '../../services/apiService';
import {cleanUrl} from '../../config/regex';

export interface InitializerState {
  data: InitializerResponse | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

export interface AppUpdateConfig {
  is_app_update_required: boolean;
  android_version: string;
  ios_version: string;
  android_url: string;
  ios_url: string;
}

const initialState: InitializerState = {
  data: null,
  loading: false,
  error: null,
  lastFetched: null,
};

// Async thunk
export const fetchInitializer = createAsyncThunk(
  'initializer/fetchInitializer',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetchInitializerApi();

      // Clean the URLs before storing in state
      const cleanedResponse = {
        ...response,
        privacy_policy_page: cleanUrl(response.privacy_policy_page),
        terms_of_use_page: cleanUrl(response.terms_of_use_page),
        whatsapp_url: cleanUrl(response.whatsapp_url),
        app_update_config: {
          ...response.app_update_config,
          android_url: cleanUrl(response.app_update_config.android_url),
          ios_url: cleanUrl(response.app_update_config.ios_url),
        },
      };

      return cleanedResponse;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Failed to fetch app configuration',
      );
    }
  },
);

const initializerSlice = createSlice({
  name: 'initializer',
  initialState,
  reducers: {
    clearInitializerError: state => {
      state.error = null;
    },
    updateLanguage: (state, action: PayloadAction<string>) => {
      if (state.data) {
        state.data.default_language = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchInitializer.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInitializer.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        state.lastFetched = Date.now();
      })
      .addCase(fetchInitializer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearInitializerError, updateLanguage} = initializerSlice.actions;
export default initializerSlice.reducer;
