import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/interfaces/User';
import { registerAsync, loginAsync } from '@/apiServices/authApi';

interface AuthState {
  user: User | '';
  isRegistered: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: '',
  isRegistered: false,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = '';
      state.isRegistered = false;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.error = 'Login failed. Wrong username and/or password.';
      })
      .addCase(registerAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.isRegistered = true;
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state) => {
        state.error = 'Registration failed. Pls check form input';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
