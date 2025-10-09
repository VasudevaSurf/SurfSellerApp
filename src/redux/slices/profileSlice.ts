import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchProfileApi,
  updateProfileApi,
  ProfileResponse,
  UserProfile,
  ProfileUpdateResponse,
} from '../../services/apiService';
import {RootState} from '../store';

export interface ProfileState {
  profileData: UserProfile | null;
  rawProfileData: ProfileResponse | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
  updateError: string | null;
  updateSuccess: boolean;
  lastUpdated: number | null;
}

const initialState: ProfileState = {
  profileData: null,
  rawProfileData: null,
  loading: false,
  error: null,
  updating: false,
  updateError: null,
  updateSuccess: false,
  lastUpdated: null,
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

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError: state => {
      state.error = null;
      state.updateError = null;
    },
    clearUpdateSuccess: state => {
      state.updateSuccess = false;
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
        console.log('fetchProfile.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        console.log('fetchProfile.fulfilled with data:', action.payload);
        state.loading = false;
        state.rawProfileData = action.payload;
        state.profileData = extractUserProfile(action.payload.sections);
        state.error = null;
        state.lastUpdated = Date.now();
        console.log('Extracted profile data:', state.profileData);
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        console.log('fetchProfile.rejected with error:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Profile
      .addCase(updateProfile.pending, state => {
        console.log('updateProfile.pending');
        state.updating = true;
        state.updateError = null;
        state.updateSuccess = false;
      })
      // In the updateProfile.fulfilled case
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log('updateProfile.fulfilled with data:', action.payload);
        state.updating = false;

        // Check if response is valid
        if (
          action.payload.response &&
          typeof action.payload.response === 'object'
        ) {
          // Only update if we got a proper response
          if (action.payload.response.result === true) {
            // Immediately update local profile data
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
        console.log('updateProfile.rejected with error:', action.payload);
        state.updating = false;
        state.updateError = action.payload as string;
        state.updateSuccess = false;
      });
  },
});

export const {
  clearProfileError,
  clearUpdateSuccess,
  updateLocalProfile,
  resetProfileState,
} = profileSlice.actions;
export default profileSlice.reducer;
