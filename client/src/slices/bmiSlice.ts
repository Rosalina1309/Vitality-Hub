import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import calculateAdvice from "@/helpers/calculateAdvices";

export interface BmiCalcState {
  height: string;
  weight: string;
  bmi: number | null;
  errMessage: string;
  advice: string;
}

const initialState: BmiCalcState = {
  height: '',
  weight: '',
  bmi: null,
  errMessage: '',
  advice: '',
}

export const bmiSlice = createSlice({
  name: 'bmi',
  initialState,
  reducers: {
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setWeight: (state, action) => {
      state.weight = action.payload;
    },
    calculateBmi: (state) => {
      const heightValue = parseFloat(state.height);
      const weightValue = parseFloat(state.weight);

      if (!isNaN(heightValue) && !isNaN(weightValue) && heightValue > 0 && weightValue > 0) {
        const heightInMeters = heightValue / 100;
        const calculatedBMI = weightValue / (heightInMeters * heightInMeters);
        state.bmi = calculatedBMI;
        state.errMessage = '';
        state.advice = calculateAdvice(state.bmi);
      } else {
        state.bmi = null;
        state.advice = '';
        state.errMessage = "Please enter valid height and weight values.";
      }
    }
  }
})

export const selectBmi = (state: RootState) => state.bmi.bmi;
export const { setHeight, setWeight, calculateBmi } = bmiSlice.actions;

export default bmiSlice.reducer;