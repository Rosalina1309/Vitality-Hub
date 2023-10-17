import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/interfaces/User';
import { registerAsync, loginAsync } from '@/apiServices/authApi';

interface AuthState {
  user: User | '';
  isRegistered: boolean;
  isAuthenticated: boolean;
  loginError: string | null;
  registrationError: string | null;
}

const initialState: AuthState = {
  user: '',
  isRegistered: false,
  isAuthenticated: false,
  loginError: null,
  registrationError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = '';
      state.isRegistered = false;
      state.isAuthenticated = false;
      state.loginError = null;
      state.registrationError = null;
    },
    clearError: (state) => {
      state.loginError = null;
      state.registrationError = null;
    },
    setIsAuthenticated: (state) => {
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loginError = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loginError = null;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.loginError = 'Login failed. Wrong username and/or password.';
      })
      .addCase(registerAsync.pending, (state) => {
        state.registrationError = null;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.isRegistered = true;
        state.registrationError = null;
      })
      .addCase(registerAsync.rejected, (state) => {
        state.registrationError = 'Registration failed. Please check form input.';
      });
  },
});

export const { logout, clearError, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
