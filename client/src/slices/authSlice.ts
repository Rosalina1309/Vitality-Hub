import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/interfaces/User'; 

export interface Authstate {
  user: User | '';
  isRegistered: boolean;
  isAuthenticated: boolean;
}

const initialState = {
  user: '',
  isRegistered: false,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.isRegistered = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = '';
      state.isRegistered = false;
      state.isAuthenticated = false;
    }
  }
})

export const { registerSuccess, loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
