import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchExercises, fetchExercisesByMuscle } from '@/apiServices/fetchExercises';
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
  async (): Promise<Exercise[]> => {
    try {
      const response = await fetchExercises();
      console.log(response);

      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchExercisesByMuscleAsync = createAsyncThunk(
  'exercises/fetchExercisesByMuscle',
  async (muscle: string): Promise<Exercise[]> => {
    try {
      const response = await fetchExercisesByMuscle(muscle);
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
      })
      .addCase(fetchExercisesByMuscleAsync.pending, (state, action) => {
        state.exercises = null;
      })
      .addCase(fetchExercisesByMuscleAsync.fulfilled, (state, action) => {
        state.exercises = action.payload.slice(0, 5);
      })
      .addCase(fetchExercisesByMuscleAsync.rejected, (state, action) => {
        console.error('Error fetching exercises by muscle:', action.error);
      });;
  },
});

export const { setMuscle, setSelectedExercise} = exerciseSlice.actions;

export default exerciseSlice.reducer;
