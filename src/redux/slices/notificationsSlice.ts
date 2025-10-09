import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchNotificationsApi,
  markNotificationAsReadApi,
  deleteNotificationApi,
  NotificationItem,
  NotificationsResponse,
} from '../../services/apiService';

interface NotificationsState {
  notifications: NotificationItem[];
  loading: boolean;
  error: string | null;
  deleting: string[];
  deleteError: string | null;
}

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  error: null,
  deleting: [],
  deleteError: null,
};

// Fetch all notifications
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (
    {userId, section}: {userId: string; section?: string},
    {rejectWithValue},
  ) => {
    try {
      console.log('fetchNotifications thunk called:', {userId, section});
      const response = await fetchNotificationsApi(userId, 'N', section);
      return response;
    } catch (error: any) {
      console.error('fetchNotifications thunk error:', error);
      return rejectWithValue(error.message || 'Failed to fetch notifications');
    }
  },
);

// Mark notification as read
export const markNotificationAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (
    {userId, notificationId}: {userId: string; notificationId: string},
    {rejectWithValue},
  ) => {
    try {
      console.log('markNotificationAsRead thunk called:', {
        userId,
        notificationId,
      });
      const response = await markNotificationAsReadApi(userId, notificationId);
      return {notificationId, ...response};
    } catch (error: any) {
      console.error('markNotificationAsRead thunk error:', error);
      return rejectWithValue(
        error.message || 'Failed to mark notification as read',
      );
    }
  },
);

// Delete notification
export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (
    {userId, notificationId}: {userId: string; notificationId: string},
    {rejectWithValue},
  ) => {
    try {
      console.log('deleteNotification thunk called:', {userId, notificationId});
      const response = await deleteNotificationApi(userId, notificationId);
      return {notificationId, ...response};
    } catch (error: any) {
      console.error('deleteNotification thunk error:', error);
      return rejectWithValue(error.message || 'Failed to delete notification');
    }
  },
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotificationsError: state => {
      state.error = null;
      state.deleteError = null;
    },
    resetNotifications: () => initialState,
  },
  extraReducers: builder => {
    builder
      // Fetch Notifications
      .addCase(fetchNotifications.pending, state => {
        console.log('fetchNotifications.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        console.log('fetchNotifications.fulfilled:', action.payload);
        state.loading = false;
        state.notifications = action.payload.notifications;
        state.error = null;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        console.log('fetchNotifications.rejected:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })

      // Mark as Read
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        console.log('markNotificationAsRead.fulfilled:', action.payload);
        const notificationIndex = state.notifications.findIndex(
          n => n.notification_id === action.payload.notificationId,
        );
        if (notificationIndex !== -1) {
          state.notifications[notificationIndex].is_read = '1';
        }
      })

      // Delete Notification
      .addCase(deleteNotification.pending, (state, action) => {
        console.log('deleteNotification.pending');
        const {notificationId} = action.meta.arg;
        state.deleting.push(notificationId);
        state.deleteError = null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        console.log('deleteNotification.fulfilled:', action.payload);
        const {notificationId} = action.payload;
        state.notifications = state.notifications.filter(
          n => n.notification_id !== notificationId,
        );
        state.deleting = state.deleting.filter(id => id !== notificationId);
        state.deleteError = null;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        console.log('deleteNotification.rejected:', action.payload);
        const {notificationId} = action.meta.arg;
        state.deleting = state.deleting.filter(id => id !== notificationId);
        state.deleteError = action.payload as string;
      });
  },
});

export const {clearNotificationsError, resetNotifications} =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
