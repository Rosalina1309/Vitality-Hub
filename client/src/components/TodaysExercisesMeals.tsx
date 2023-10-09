import React, { useState, useEffect } from "react";
import styles from "@/styles/todaysExercisesMeals.module.css";

const TodaysExercisesMeals: React.FC = () => {
  const [exercises, setExercises] = useState<string[]>([]);
  const [meals, setMeals] = useState<string[]>([]);

  useEffect(() => {
    const hardcodedExercises = [
      "Gekke squats en die dinge",
      "Jumping jacks",
      "Push-ups",
    ];

    const hardcodedMeals = [
      "Tantoe dikke pasta neeefski",
      "Spaghetti carbonara",
      "Chicken Alfredo",
    ];

    setExercises(hardcodedExercises);
    setMeals(hardcodedMeals);
  }, []);

  return (
    <div className={styles.containerExercisesMeals}>
      <div className={styles.boxExercisesMeals}>
        <p className={styles.title}>Today's Exercises</p>
        <div className={styles.listExercisesMeals}>
          {exercises.map((exercise, index) => (
            <div className={styles.listItem} key={index}>
              <p className={styles.exerciseItem}>{exercise}</p>
              <button className={styles.checkBtn}>Check</button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.boxExercisesMeals}>
        <p className={styles.title}>Today's Meals</p>
        <div className={styles.listExercisesMeals}>
          {meals.map((meal, index) => (
            <div className={styles.listItem} key={index}>
              <p className={styles.mealItem}>{meal}</p>
              <button className={styles.checkBtn}>Check</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodaysExercisesMeals;
