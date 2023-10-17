import { createSlice } from '@reduxjs/toolkit';

export interface CalendarState {
  isOpen: boolean;
}

const initialState: CalendarState = {
  isOpen: false,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    toggle: state => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggle} = calendarSlice.actions;

export default calendarSlice.reducer;
