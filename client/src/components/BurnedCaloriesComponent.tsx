import styles from '../styles/burnedCaloriesComponent.module.css';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import {
  setDuration,
  setSelectedActivity,
  setWeight,
  setTotalCalories,
} from '@/slices/burnedCaloriesSlice';

const metValue = [
  { Sleeping: 0.9 },
  { 'Watching TV': 1 },
  { 'Desk work': 1.8 },
  //strolling  is around 2.7km/h - really slow
  { Strolling: 2.3 },
  //Walking is around 4 km/h
  { Walking: 2.9 },
  { 'Resistance training/weight training': 3.5 },
  { 'Moderate calisthenics(e.g. push ups, sit ups, lunges': 3.8 },
  { Pilates: 3.8 },
  { Yoga: 3 },
  { 'Water exercise': 2.5 },
  { 'Light bicycling': 5.3 },
  { 'Moderate walking': 3.3 },
  { 'Moderate home exercise': 3.5 },
  { 'Fast walking': 3.6 },
  { 'Moderate bicycling': 4 },
  { 'Fast bicycling': 5.5 },
  { Jogging: 7 },
  { 'Heavy calisthenics(e.g. push ups, sit ups, lunges': 8 },
  { Running: 8 },
  { 'Rope jumping': 10 },
];

const BurnedCaloriesComponent: React.FC = () => {
  const duration = useAppSelector(state => state.burnedCalories.duration);
  const selectedActivity = useAppSelector(
    state => state.burnedCalories.selectedActivity
  );
  const weight = useAppSelector(state => state.burnedCalories.weight);
  const totalCalories = useAppSelector(
    state => state.burnedCalories.totalCalories
  );
  const dispatch = useAppDispatch();

  const handleCalculateClick = () => {
    const selectedMet = metValue.find(
      activity => Object.keys(activity)[0] === selectedActivity
    );
    if (selectedMet && duration && weight) {
      const met = Object.values(selectedMet)[0];
      const caloriesBurned =
        (parseFloat(duration) * (met * 3.5 * parseFloat(weight))) / 200;
      dispatch(setTotalCalories(caloriesBurned));
    } else {
      dispatch(setTotalCalories(null));
    }
  };

  return (
    <div className={styles.burnedCals}>
      <h3>Duration of physical activity in minute:</h3>
      <input
        type='number'
        value={duration}
        onChange={e => dispatch(setDuration(e.target.value))}
      />
      <h3>Choose an activity: </h3>
      <div className={styles['select-item']}>
        <select
          value={selectedActivity}
          onChange={e => dispatch(setSelectedActivity(e.target.value))}>
          <option value=''>Select an activity</option>
          {metValue.map((activity, index) => (
            <option key={index} value={Object.keys(activity)[0]}>
              {Object.keys(activity)[0]}
            </option>
          ))}
        </select>
      </div>
      <h3>Enter your weight in kg:</h3>
      <input
        type='number'
        value={weight}
        onChange={e => dispatch(setWeight(e.target.value))}
      />
      <button onClick={handleCalculateClick}>Calculate</button>
      {totalCalories !== null && (
        <div className={styles.details}>
          <h3>Total calories burned:</h3>
          <p>{totalCalories.toFixed(2)} calories</p>
        </div>
      )}
    </div>
  );
};

export default BurnedCaloriesComponent;
