import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchProfileApi,
  updateProfileApi,
  ProfileResponse,
  UserProfile,
} from '../../services/apiService';

export interface ProfileState {
  profileData: UserProfile | null;
  rawProfileData: ProfileResponse | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
  updateError: string | null;
}

const initialState: ProfileState = {
  profileData: null,
  rawProfileData: null,
  loading: false,
  error: null,
  updating: false,
  updateError: null,
};

// Helper function to extract user profile from API response
const extractUserProfile = (
  sections: ProfileResponse['sections'],
): UserProfile => {
  const userProfile: Partial<UserProfile> = {};

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
          case 'password1':
            // Don't store password in profile
            break;
        }
      });
    });
  });

  return userProfile as UserProfile;
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
    {rejectWithValue},
  ) => {
    try {
      console.log(
        'Updating profile for userId:',
        userId,
        'with data:',
        profileData,
      );
      const response = await updateProfileApi(userId, profileData);
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
    updateLocalProfile: (
      state,
      action: PayloadAction<Partial<UserProfile>>,
    ) => {
      if (state.profileData) {
        state.profileData = {...state.profileData, ...action.payload};
      }
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
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log('updateProfile.fulfilled with data:', action.payload);
        state.updating = false;
        // Update local profile data with the changes
        if (state.profileData) {
          state.profileData = {
            ...state.profileData,
            ...action.payload.profileData,
          };
        }
        state.updateError = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        console.log('updateProfile.rejected with error:', action.payload);
        state.updating = false;
        state.updateError = action.payload as string;
      });
  },
});

export const {clearProfileError, updateLocalProfile, resetProfileState} =
  profileSlice.actions;
export default profileSlice.reducer;
