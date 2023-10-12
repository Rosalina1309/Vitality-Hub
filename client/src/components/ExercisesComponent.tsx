import React, { useEffect, useState } from 'react';
import styles from '../styles/exercisesComponent.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  fetchExercisesAsync,
  setMuscle,
  setSelectedExercise,
} from '@/slices/exercisesSlice';

const ExercisesComponent: React.FC = () => {
  const muscle = useAppSelector(state => state.exercises.muscle);
  const exercises = useAppSelector(state => state.exercises.exercises);
  const selectedExercise = useAppSelector(
    state => state.exercises.selectedExercise
  );
  const [favoriteExercises, setFavoriteExercises] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedFavorites = localStorage.getItem('favoriteExercises');
    if (savedFavorites) {
      setFavoriteExercises(JSON.parse(savedFavorites));
    }

    const fetchData = async () => {
      try {
        await dispatch(fetchExercisesAsync(''));
      } catch (err) {
        console.error('Error fetching exercises:', err);
      }
    };

    fetchData();
  }, []);

  const handleExerciseClick = (exerciseName: string) => {
    dispatch(setSelectedExercise(exerciseName));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get('muscle-input') as string;
    console.log(value);

    dispatch(setMuscle(value));
    try {
      await dispatch(fetchExercisesAsync(value));
    } catch (error) {
      console.error(error);
    }
    dispatch(setMuscle(''));
  };

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    dispatch(setMuscle(e.currentTarget.value));
  };

  const handleToggleFavorite = async (exerciseId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `mutation ToggleFavoriteExercise {
            toggleFavorite(type: "exercise", itemId: "${exerciseId}") {
              user {
                favoriteExercises {
                  exerciseId
                }
              }
            }
          }`,
        }),
      });

      const responseData = await response.json();
      const updatedFavorites =
        responseData.data.toggleFavorite.user.favoriteExercises.map(
          (fav: { exerciseId: string }) => fav.exerciseId
        );
      setFavoriteExercises(updatedFavorites);
      localStorage.setItem(
        'favoriteExercises',
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Enter Muscle:</h2>
      <form className={styles.inputwrapper} onSubmit={handleSubmit}>
        <input
          name='muscle-input'
          type='text'
          value={muscle}
          onChange={handleChange}
        />
      </form>
      <div className={styles.exercises}>
        {exercises !== null && exercises.length > 0 ? (
          exercises.map(exercise => (
            <div key={exercise.name} className={styles['exercise-card']}>
              <h3>
                {exercise.name}{' '}
                <button
                  onClick={() => handleToggleFavorite(exercise.id)}
                  className={`
                ${
                  favoriteExercises.includes(exercise.id)
                    ? styles.favorite
                    : ''
                }`}></button>
              </h3>
              <p>
                <strong>Type:</strong> {exercise.type}
              </p>
              <p>
                <strong>Muscle:</strong> {exercise.muscle}
              </p>
              <p>
                <strong>Equipment:</strong> {exercise.equipment}
              </p>
              <p>
                <strong>Difficulty:</strong> {exercise.difficulty}
              </p>
              <button onClick={() => handleExerciseClick(exercise.name)}>
                {selectedExercise === exercise.name ? 'Hide' : 'Show'}{' '}
                Instructions
              </button>

              {selectedExercise === exercise.name && (
                <div className={styles.instructions}>
                  <h4>
                    <strong>Instructions:</strong>
                  </h4>
                  <p>{exercise.instructions}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className={styles['error-message']}>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ExercisesComponent;
