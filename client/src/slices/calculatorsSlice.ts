import { createSlice } from '@reduxjs/toolkit'

export interface CalculatorsState {
  showBMI: boolean;
  showWHR: boolean;
}

const initialState: CalculatorsState = {
  showBMI: false,
  showWHR: false,
};

export const calculatorsSlice = createSlice({
  name: 'calculators',
  initialState,
  reducers: {
    setShowBMI: state => {
      state.showBMI = true;
      state.showWHR = false;
    },
    setShowWHR: state => {
      state.showBMI = false;
      state.showWHR = true;
    },
  },
});

export const { setShowBMI, setShowWHR } = calculatorsSlice.actions;

export default calculatorsSlice.reducer;
