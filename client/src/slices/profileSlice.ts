import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/interfaces/User';

interface ProfileState {
  user: User | '';
}

const initialState: ProfileState = {
  user: ''
}

const profileSlice = createSlice({
  name: 'profle',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  }
})

export const { setUser } = profileSlice.actions;

export default profileSlice.reducer;
