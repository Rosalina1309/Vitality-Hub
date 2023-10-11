import { createSlice } from '@reduxjs/toolkit';

export interface MenuState {
  isOpen: boolean;
}

const initialState: MenuState = {
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

export const { toggle } = menuSlice.actions;

export default menuSlice.reducer;
