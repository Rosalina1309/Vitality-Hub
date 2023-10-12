
// 'use client'
// import React, { useState, useEffect } from 'react';
// import { fetchExercises } from "@/apiServices/fetchExercises";
// import { Exercise } from '@/interfaces/Exercise';
// import styles from '../styles/exercisesComponent.module.css';

// const ExercisesComponent: React.FC = () => {
//   const [muscle, setMuscle] = useState<string>('');
//   const [exercises, setExercises] = useState<Exercise[] | undefined>(undefined);
//   const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchExercises(muscle);
//         // Limit the exercises to 5
//         setExercises(data.slice(0, 5));
//       } catch (err) {
//         console.error("Error fetching exercises:", err);
//       }
//     };

//     fetchData();

//   }, [muscle]);

//   const handleExerciseClick = (exerciseName: string) => {
//     setSelectedExercise(exerciseName === selectedExercise ? null : exerciseName);
//   };

//   return (
//     <div className={styles.container}>
//       <h2>Enter Muscle:</h2>
//       <div className={styles.inputwrapper}>
//         <input
//           type="text"
//           value={muscle}
//           onChange={(e) => setMuscle(e.target.value)}
//         />
//       </div>
//       <div>
//   {exercises !== undefined && exercises.length > 0 ? (
//     exercises.map((exercise) => (
//       <div key={exercise.name} className={styles['exercise-card']}>
//         <h3>{exercise.name}</h3>
//         <p><strong>Type:</strong> {exercise.type}</p>
//         <p><strong>Muscle:</strong> {exercise.muscle}</p>
//         <p><strong>Equipment:</strong> {exercise.equipment}</p>
//         <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
//         <button onClick={() => handleExerciseClick(exercise.name)}>
//           {selectedExercise === exercise.name ? "Hide" : "Show"} Instructions
//         </button>
//         {selectedExercise === exercise.name && (
//           <>
//             <h4><strong>Instructions:</strong></h4>
//             <p>{exercise.instructions}</p>
//           </>
//         )}
//       </div>
//     ))
//   ) : (
//     <p className={styles['error-message']}>Loading...</p>
//   )}
// </div>

//     </div>
//   );
// };

// export default ExercisesComponent;


'use client'

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

  const handleToggleFavorite = (exerciseName: string) => {
    if (favoriteExercises.includes(exerciseName)) {
      const updatedFavorites = favoriteExercises.filter((name) => name !== exerciseName);
      setFavoriteExercises(updatedFavorites);
      localStorage.setItem('favoriteExercises', JSON.stringify(updatedFavorites));
    } else {
      setFavoriteExercises([...favoriteExercises, exerciseName]);
      localStorage.setItem('favoriteExercises', JSON.stringify([...favoriteExercises, exerciseName]));
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
            <div key={exercise.name} className={styles['exercise-card']}>
              <h3>{exercise.name}</h3>
              <p><strong>Type:</strong> {exercise.type}</p>
              <p><strong>Muscle:</strong> {exercise.muscle}</p>
              <p><strong>Equipment:</strong> {exercise.equipment}</p>
              <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
              <button onClick={() => handleExerciseClick(exercise.name)}>
                {selectedExercise === exercise.name ? "Hide" : "Show"} Instructions
              </button>
              <button onClick={() => handleToggleFavorite(exercise.name)}>
                {favoriteExercises.includes(exercise.name) ? "Remove from Favorites" : "Add to Favorites"}
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
