import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchExercises } from '@/apiServices/fetchExercises';
import { Exercise } from '@/interfaces/Exercise';

export interface ExercisesState {
  muscle: string;
  muscleInput: string;
  exercises: Exercise[] | null;
  selectedExercise: string | null;
}

const initialState: ExercisesState = {
  muscle: '',
  muscleInput: '',
  exercises: null,
  selectedExercise: null,

};

export const fetchExercisesAsync = createAsyncThunk(
  'exercises/fetchExercises',
  async (muscle: string): Promise<Exercise[]> => {
    try {
      const response = await fetchExercises(muscle);
      console.log(response);

      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const exerciseSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setMuscle: (state, action) => {
      state.muscle = action.payload;
    },
    setSelectedExercise: (state, action) => {
      state.selectedExercise =
        action.payload === state.selectedExercise ? null : action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchExercisesAsync.pending, (state, action) => {
        state.exercises = null;
      })
      .addCase(fetchExercisesAsync.fulfilled, (state, action) => {
        state.exercises = action.payload.slice(0, 5);
      })
      .addCase(fetchExercisesAsync.rejected, (state, action) => {
        console.error('Error fetching exercises:', action.error);
      });
  },
});

export const { setMuscle, setSelectedExercise} = exerciseSlice.actions;

export default exerciseSlice.reducer;
