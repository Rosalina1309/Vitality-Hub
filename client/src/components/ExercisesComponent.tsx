
'use client';

import React, { useState, useEffect } from 'react';
import { fetchExercises } from "@/apiServices/fetchExercises";
import { Exercise } from '@/interfaces/Exercise';
import styles from '../styles/exercisesComponent.module.css';

const ExercisesComponent: React.FC = () => {
  const [muscle, setMuscle] = useState<string>('');
  const [exercises, setExercises] = useState<Exercise[] | undefined>(undefined);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [favoriteExercises, setFavoriteExercises] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedFavorites = localStorage.getItem('favoriteExercises');
    if (savedFavorites) {
      setFavoriteExercises(JSON.parse(savedFavorites));
    }

    const fetchData = async () => {
      try {
        const data = await fetchExercises();
        setExercises(data);
      } catch (err) {
        console.error("Error fetching exercises:", err);
      }
    };

    fetchData();

  }, [muscle]);

  const handleExerciseClick = (exerciseName: string) => {
    setSelectedExercise(exerciseName === selectedExercise ? null : exerciseName);
  };

  const handleToggleFavorite = async (exerciseId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
          }`
        })
      });

      const responseData = await response.json();
      const updatedFavorites = responseData.data.toggleFavorite.user.favoriteExercises.map((fav: { exerciseId: string }) => fav.exerciseId);
      setFavoriteExercises(updatedFavorites);
      localStorage.setItem('favoriteExercises', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className={styles.container}>
    <h2>Enter Muscle:</h2>
    <div className={styles.inputwrapper}>
      <input
        type="text"
        value={muscle}
        onChange={(e) => setMuscle(e.target.value)}
      />
    </div>
    <div>
      {exercises !== undefined && exercises.length > 0 ? (
        exercises.map((exercise) => (
          <div key={exercise.id} className={styles['exercise-card']}>
            <h3>{exercise.name}</h3>
            <p><strong>Type:</strong> {exercise.type}</p>
            <p><strong>Muscle:</strong> {exercise.muscle}</p>
            <p><strong>Equipment:</strong> {exercise.equipment}</p>
            <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
            <button onClick={() => handleExerciseClick(exercise.name)}>
              {selectedExercise === exercise.name ? "Hide" : "Show"} Instructions
            </button>
            <button onClick={() => handleToggleFavorite(exercise.id)}>
              {favoriteExercises.includes(exercise.id) ? "Remove from Favorites" : "Add to Favorites"}
            </button>
            {selectedExercise === exercise.name && (
              <>
                <h4><strong>Instructions:</strong></h4>
                <p>{exercise.instructions}</p>
              </>
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
