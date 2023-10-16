'use client'

import { useState } from "react";
import styles from '../styles/burnedCaloriesComponent.module.css'


const metValue = [
  {'Sleeping': 0.9},
  {'Watching TV': 1},
  {'Desk work': 1.8},
  //strolling  is around 2.7km/h - really slow
  {'Strolling': 2.3},
  //Walking is around 4 km/h
  {'Walking': 2.9},
  {'Resistance training/weight training': 3.5},
  {'Moderate calisthenics(e.g. push ups, sit ups, lunges': 3.8},
  {'Pilates': 3.8},
  {'Yoga': 3},
  {'Water exercise': 2.5},
  {'Light bicycling': 5.3},
  {'Moderate walking': 3.3},
  {'Moderate home exercise': 3.5 },
  {'Fast walking': 3.6},
  {'Moderate bicycling': 4},
  {'Fast bicycling': 5.5},
  {'Jogging': 7},
  {'Heavy calisthenics(e.g. push ups, sit ups, lunges': 8},
  {'Running': 8},
  {'Rope jumping': 10}
]

const BurnedCaloriesComponent: React.FC = () =>{
  const [duration, setDuration] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [totalCalories, setTotalCalories] = useState<number | null>(null);

  const handleCalculateClick = () => {
    const selectedMet = metValue.find((activity) => Object.keys(activity)[0] === selectedActivity);
    if (selectedMet && duration && weight) {
      const met = Object.values(selectedMet)[0];
      const caloriesBurned = (parseFloat(duration) * (met * 3.5 * parseFloat(weight))) / 200;
      setTotalCalories(caloriesBurned);
    } else {
      setTotalCalories(null);
    }
  };

  return (
    <div className={styles.burnedCals}>
      <h3>Duration of physical activity in minute:</h3>
      <input
        type='number'
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <h3>Choose an activity: </h3>
      <select
        value={selectedActivity}
        onChange={(e) => setSelectedActivity(e.target.value)}
      >
        <option value="">Select an activity</option>
        {metValue.map((activity, index) => (
          <option key={index} value={Object.keys(activity)[0]}>
            {Object.keys(activity)[0]}
          </option>
        ))}
      </select>
      <h3>Enter your weight in kg:</h3>
      <input
        type='number'
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <button onClick={handleCalculateClick}>Calculate</button>
      {totalCalories !== null && (
        <div>
          <h3>Total calories burned:</h3>
          <p>{totalCalories.toFixed(2)} calories</p>
        </div>
      )}
    </div>
  )
}

export default BurnedCaloriesComponent;