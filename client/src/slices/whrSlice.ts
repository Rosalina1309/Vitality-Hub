import { createSlice } from '@reduxjs/toolkit';

export interface WhrState {
  gender: string;
  waist: string;
  hip: string;
  whr: number | null;
  errMessage: string;
  success: boolean;
}

const initialState: WhrState = {
  gender: 'male',
  waist: '',
  hip: '',
  whr: null,
  errMessage: '',
  success: false,
};

export const whrSlice = createSlice({
  name: 'whr',
  initialState,
  reducers: {
    setHip: (state, action) => {
      state.hip = action.payload;
    },
    setWaist: (state, action) => {
      state.waist = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    calculateWhr: state => {
      const waistValue = parseFloat(state.waist);
      const hipValue = parseFloat(state.hip);

      if (
        !isNaN(waistValue) &&
        !isNaN(hipValue) &&
        waistValue > 0 &&
        hipValue > 0
      ) {
        const calculatedWHR = waistValue / hipValue;
        state.whr = calculatedWHR;
        state.errMessage = '';
      } else {
        state.whr = null;
        state.errMessage = 'Please enter valid waist and hip values.';
      }
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
});

export const { setHip, setWaist, setGender, calculateWhr, setSuccess } = whrSlice.actions;

export default whrSlice.reducer;
