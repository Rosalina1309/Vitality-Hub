import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

export interface menuState {
  isOpen: boolean;
}

const initialState: menuState = {
  isOpen: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggle: state => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const selectMenu = (state: RootState) => state.menu.isOpen;
export const { toggle } = menuSlice.actions;

export default menuSlice.reducer;
