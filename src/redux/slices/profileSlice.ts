import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchProfileApi,
  updateProfileApi,
  ProfileResponse,
  UserProfile,
  ProfileUpdateResponse,
  LogoUploadResponse,
  LogoData,
  getProfileLogosApi,
  uploadCompanyLogoApi,
  deleteAccountApi,
} from '../../services/apiService';
import {RootState} from '../store';

export interface ProfileState {
  profileData: UserProfile | null;
  rawProfileData: ProfileResponse | null;
  logos: LogoData | null; // Add this
  loading: boolean;
  error: string | null;
  updating: boolean;
  updateError: string | null;
  updateSuccess: boolean;
  lastUpdated: number | null;
  uploadingLogo: boolean; // Add this
  logoUploadError: string | null; // Add this
  deletingAccount: boolean;
  deleteAccountError: string | null;
  deleteAccountSuccess: boolean;
}

const initialState: ProfileState = {
  profileData: null,
  rawProfileData: null,
  logos: null, // Add this
  loading: false,
  error: null,
  updating: false,
  updateError: null,
  updateSuccess: false,
  lastUpdated: null,
  uploadingLogo: false, // Add this
  logoUploadError: null, // Add this
  deletingAccount: false,
  deleteAccountError: null,
  deleteAccountSuccess: false,
};

// Replace the helper function to extract user profile
const extractUserProfile = (
  sections: ProfileResponse['sections'],
): UserProfile => {
  const userProfile: UserProfile = {};

  sections.forEach(section => {
    section.blocks.forEach(block => {
      block.fields.forEach(field => {
        switch (field.field_name) {
          case 'email':
            userProfile.email = field.value;
            break;
          case 'firstname':
            userProfile.firstname = field.value;
            break;
          case 'lastname':
            userProfile.lastname = field.value;
            break;
          case 'phone':
            userProfile.phone = field.value;
            break;
          case 'company':
            userProfile.company = field.value;
            break;
          case 'fields_52':
            userProfile.vat_number = field.value;
            break;
          case 'address':
            userProfile.address = field.value;
            break;
          case 'city':
            userProfile.city = field.value;
            break;
          case 'postal_code':
            userProfile.postal_code = field.value;
            break;
          case 'country':
            userProfile.country = field.value;
            break;
          case 'company_description':
            userProfile.company_description = field.value;
            break;
          case 'terms':
            userProfile.terms = field.value;
            break;
          // Bank details - using correct field names from API
          case 'fields_53': // Account Holder Full Name
            userProfile.accountholder_full_name = field.value;
            break;
          case 'fields_57': // Bank Name
            userProfile.bank_name = field.value;
            break;
          case 'fields_54': // IBAN
            userProfile.iban = field.value;
            break;
          case 'fields_56': // BIC
            userProfile.bic = field.value;
            break;
        }
      });
    });
  });

  return userProfile;
};

// Async thunks
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (userId: string, {rejectWithValue}) => {
    try {
      console.log('Fetching profile for userId:', userId);
      const response = await fetchProfileApi(userId);
      console.log('Profile API response:', response);
      return response;
    } catch (error: any) {
      console.error('Fetch profile error:', error);
      return rejectWithValue(error.message || 'Failed to fetch profile');
    }
  },
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (
    {userId, profileData}: {userId: string; profileData: Partial<UserProfile>},
    {rejectWithValue, getState},
  ) => {
    try {
      console.log(
        'Updating profile for userId:',
        userId,
        'with data:',
        profileData,
      );

      // Get current profile data from state
      const state = getState() as RootState;
      const currentProfileData = state.profile.profileData;

      const response = await updateProfileApi(
        userId,
        profileData,
        currentProfileData,
      );
      console.log('Update profile API response:', response);
      return {response, profileData};
    } catch (error: any) {
      console.error('Update profile error:', error);
      return rejectWithValue(error.message || 'Failed to update profile');
    }
  },
);

export const uploadCompanyLogo = createAsyncThunk(
  'profile/uploadLogo',
  async (
    {
      userId,
      logoUri,
      logoType,
    }: {
      userId: string;
      logoUri: string;
      logoType: 'theme' | 'mail';
    },
    {rejectWithValue},
  ) => {
    try {
      console.log('Uploading logo:', {userId, logoType});
      const response = await uploadCompanyLogoApi(userId, logoUri, logoType);

      // Fetch updated logos after upload
      const logos = await getProfileLogosApi(userId);

      return {response, logos, logoType};
    } catch (error: any) {
      console.error('Upload logo error:', error);
      return rejectWithValue(error.message || 'Failed to upload logo');
    }
  },
);

export const fetchProfileLogos = createAsyncThunk(
  'profile/fetchLogos',
  async (userId: string, {rejectWithValue}) => {
    try {
      console.log('Fetching logos for userId:', userId);
      const logos = await getProfileLogosApi(userId);
      return logos;
    } catch (error: any) {
      console.error('Fetch logos error:', error);
      return rejectWithValue(error.message || 'Failed to fetch logos');
    }
  },
);

// Add this thunk after updateProfile
export const deleteAccount = createAsyncThunk(
  'profile/deleteAccount',
  async (userId: string, {rejectWithValue, getState}) => {
    try {
      console.log('🗑️ Starting account deletion for userId:', userId);

      // Get current profile data from state
      const state = getState() as RootState;
      const currentProfileData = state.profile.profileData;

      if (!currentProfileData) {
        throw new Error('Profile data not available');
      }

      // Prepare user_data and company_data from current profile
      const userData = {
        email: currentProfileData.email || '',
        firstname: currentProfileData.firstname || '',
        lastname: currentProfileData.lastname || '',
      };

      const companyData = {
        fields_53: currentProfileData.accountholder_full_name || '',
        fields_54: currentProfileData.iban || '',
        fields_56: currentProfileData.bic || '',
        fields_57: currentProfileData.bank_name || '',
      };

      const response = await deleteAccountApi(userId, userData, companyData);

      console.log('✅ Account deletion response:', response);

      return response;
    } catch (error: any) {
      console.error('❌ Delete account error:', error);
      return rejectWithValue(error.message || 'Failed to delete account');
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError: state => {
      state.error = null;
      state.updateError = null;
      state.logoUploadError = null;
      state.deleteAccountError = null; // ✅ Add this
    },
    clearUpdateSuccess: state => {
      state.updateSuccess = false;
    },
    // ✅ Add this new reducer
    clearDeleteAccountSuccess: state => {
      state.deleteAccountSuccess = false;
      state.deleteAccountError = null;
    },
    updateLocalProfile: (
      state,
      action: PayloadAction<Partial<UserProfile>>,
    ) => {
      if (state.profileData) {
        state.profileData = {...state.profileData, ...action.payload};
      } else {
        state.profileData = action.payload;
      }
      state.lastUpdated = Date.now();
    },
    resetProfileState: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.rawProfileData = action.payload;
        state.profileData = extractUserProfile(action.payload.sections);
        state.error = null;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Profile
      .addCase(updateProfile.pending, state => {
        state.updating = true;
        state.updateError = null;
        state.updateSuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updating = false;
        if (
          action.payload.response &&
          typeof action.payload.response === 'object'
        ) {
          if (action.payload.response.result === true) {
            if (state.profileData) {
              state.profileData = {
                ...state.profileData,
                ...action.payload.profileData,
              };
            } else {
              state.profileData = action.payload.profileData;
            }
            state.updateSuccess = true;
          }
        }
        state.updateError = null;
        state.lastUpdated = Date.now();
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload as string;
        state.updateSuccess = false;
      })
      // Upload Logo
      .addCase(uploadCompanyLogo.pending, state => {
        state.uploadingLogo = true;
        state.logoUploadError = null;
      })
      .addCase(uploadCompanyLogo.fulfilled, (state, action) => {
        state.uploadingLogo = false;
        if (action.payload.logos) {
          state.logos = action.payload.logos;
        }
        state.logoUploadError = null;
      })
      .addCase(uploadCompanyLogo.rejected, (state, action) => {
        state.uploadingLogo = false;
        state.logoUploadError = action.payload as string;
      })
      .addCase(deleteAccount.pending, state => {
        console.log('deleteAccount.pending');
        state.deletingAccount = true;
        state.deleteAccountError = null;
        state.deleteAccountSuccess = false;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        console.log('deleteAccount.fulfilled:', action.payload);
        state.deletingAccount = false;
        if (action.payload.result) {
          state.deleteAccountSuccess = true;
          state.deleteAccountError = null;
        } else {
          state.deleteAccountSuccess = false;
          state.deleteAccountError =
            action.payload.message || 'Failed to delete account';
        }
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        console.log('deleteAccount.rejected:', action.payload);
        state.deletingAccount = false;
        state.deleteAccountError = action.payload as string;
        state.deleteAccountSuccess = false;
      })
      // Fetch Logos
      .addCase(fetchProfileLogos.fulfilled, (state, action) => {
        state.logos = action.payload;
      });
  },
});

export const {
  clearProfileError,
  clearUpdateSuccess,
  clearDeleteAccountSuccess,
  updateLocalProfile,
  resetProfileState,
} = profileSlice.actions;
export default profileSlice.reducer;
