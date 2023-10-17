import React from 'react';
import styles from '../styles/nutitionComponent.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchNutritionsAsync, setFoodQuery, toggle } from '@/slices/nutritionSlice';

const NutritionComponent: React.FC = () => {
  const foodQuery = useAppSelector(state => state.nutrition.foodQuery);
  const nutritionData = useAppSelector(state => state.nutrition.nutritionData);
  const loading = useAppSelector(state => state.nutrition.loading);
  const error = useAppSelector(state => state.nutrition.error);
  const isOpen = useAppSelector(state => state.nutrition.isOpen);

  const dispatch = useAppDispatch();

  const handleFoodQueryChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    dispatch(setFoodQuery(e.currentTarget.value));
  };

  const toggleNutritions = () => {
    dispatch(toggle());
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get('search-food') as string;
    dispatch(setFoodQuery(value));
    try {
      await dispatch(fetchNutritionsAsync(value));
    } catch (error) {
      console.error(error);
    }
    dispatch(setFoodQuery(''));
  };

  return (
    <div className={`${styles.container} ${isOpen ? styles.open : ''}`}>
      <button
        className={styles['icon-nutritions']}
        onClick={toggleNutritions}></button>
      <div className={styles['input-wrapper']}>
        <h2>Get food nutritions per 100g</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='search-food'
            value={foodQuery}
            onChange={handleFoodQueryChange}
            placeholder='Enter food name'
          />
          <button className={styles['icon-search']} type='submit'>
          </button>
        </form>
      </div>

      {nutritionData && (
        <div className={styles['nutrition-info']}>
          <h3>
            {nutritionData.name.charAt(0).toUpperCase() +
              nutritionData.name.slice(1)}
          </h3>
          <p>
            <strong>Calories:</strong> {nutritionData.calories}
          </p>
          <p>
            <strong>Serving Size:</strong> {nutritionData.serving_size_g} g
          </p>
          <p>
            <strong>Total Fat:</strong> {nutritionData.fat_total_g} g
          </p>
          <p>
            <strong>Saturated Fat:</strong> {nutritionData.fat_saturated_g} g
          </p>
          <p>
            <strong>Protein:</strong> {nutritionData.protein_g} g
          </p>
          <p>
            <strong>Sodium:</strong> {nutritionData.sodium_mg} mg
          </p>
          <p>
            <strong>Potassium:</strong> {nutritionData.potassium_mg} mg
          </p>
          <p>
            <strong>Cholesterol:</strong> {nutritionData.cholesterol_mg} mg
          </p>
          <p>
            <strong>Carbohydrates:</strong>{' '}
            {nutritionData.carbonhydrates_total_g} g
          </p>
          <p>
            <strong>Fiber:</strong> {nutritionData.fiber_g} g
          </p>
          <p>
            <strong>Sugar:</strong> {nutritionData.sugar_g} g
          </p>
        </div>
      )}
      {loading && <p className={styles['error-message']}>Loading...</p>}
      {error && <p className={styles['error-message']}>{error}</p>}
    </div>
  );
};

export default NutritionComponent;
