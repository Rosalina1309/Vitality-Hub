import React from "react";
import styles from "@/styles/todaysExercisesMeals.module.css";

const TodaysExercisesMeals: React.FC = () => {
  const exercises = [
    "Gekke squats en die dinge",
    "Jumping jacks",
    "Push-ups",
  ];

  const meals = [
    "Tantoe dikke pasta neeefski",
    "Spaghetti carbonara",
    "Chicken Alfredo",
  ];

  return (
    <div className={styles.containerExercisesMeals}>
      <div className={styles.boxExercisesMeals}>
        <p className={styles.title}>Today's Exercises</p>
        <div className={styles.listExercisesMeals}>
          {exercises.map((exercise, index) => (
            <div className={styles.listItem} key={index}>
              <p className={styles.exerciseItem}>{exercise}</p>
              <button>Check</button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.boxExercisesMeals}>
        <p className={styles.title}>Today's Exercises</p>
        <div className={styles.listExercisesMeals}>
          {meals.map((exercise, index) => (
            <div className={styles.listItem} key={index}>
              <p className={styles.mealItem}>{exercise}</p>
              <button>Check</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodaysExercisesMeals;
