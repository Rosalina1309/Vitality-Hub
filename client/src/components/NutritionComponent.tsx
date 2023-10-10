'use client'

import React, { useState } from 'react';
import { fetchCaloriesPerFoodPortion } from '@/apiServices/fetchCaloriesPerFoodPortion';
import { NutritionsOfFood } from '@/interfaces/NutritionsOfFood';
import styles from '../styles/nutitionComponent.module.css'

const NutritionComponent: React.FC = () => {
  const [foodQuery, setFoodQuery] = useState<string>('');
  const [nutritionData, setNutritionData] = useState<NutritionsOfFood | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFoodQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoodQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await fetchCaloriesPerFoodPortion(foodQuery);
      setNutritionData(data[0]);
      setLoading(false);
      setError('');
    } catch (error) {
      setLoading(false);
      setError('Error fetching nutrition data.');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
    <div className={styles['input-wrapper']}>
      <h2>Get food nutritions per 100g</h2>
      <input
        type="text"
        value={foodQuery}
        onChange={(e) => setFoodQuery(e.target.value)}
        placeholder="Enter food name"
      />
      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
    </div>

    {nutritionData && (
      <div className={styles['nutrition-info']}>
        <h3>{nutritionData.name.charAt(0).toUpperCase() + nutritionData.name.slice(1)}</h3>
        <p><strong>Calories:</strong> {nutritionData.calories}</p>
        <p><strong>Serving Size:</strong> {nutritionData.serving_size_g} g</p>
        <p><strong>Total Fat:</strong> {nutritionData.fat_total_g} g</p>
        <p><strong>Saturated Fat:</strong> {nutritionData.fat_saturated_g} g</p>
        <p><strong>Protein:</strong> {nutritionData.protein_g} g</p>
        <p><strong>Sodium:</strong> {nutritionData.sodium_mg} mg</p>
        <p><strong>Potassium:</strong> {nutritionData.potassium_mg} mg</p>
        <p><strong>Cholesterol:</strong> {nutritionData.cholesterol_mg} mg</p>
        <p><strong>Carbohydrates:</strong> {nutritionData.carbonhydrates_total_g} g</p>
        <p><strong>Fiber:</strong> {nutritionData.fiber_g} g</p>
        <p><strong>Sugar:</strong> {nutritionData.sugar_g} g</p>
      </div>
      )}
    </div>
  );
};

export default NutritionComponent;
