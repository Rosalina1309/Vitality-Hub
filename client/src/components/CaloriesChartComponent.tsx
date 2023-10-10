
'use client'

import React, { useEffect, useRef, useState } from 'react';
import Chart, { ChartType } from 'chart.js/auto';
import styles from '../styles/caloriesChartComponent.module.css';

const CaloriesChartComponent: React.FC = () => {
  const [consumedCalories, setConsumedCalories] = useState<string>("");
  const totalCalories = 2000;
  const numericConsumedCalories = consumedCalories !== "" ? parseInt(consumedCalories, 10) : 0;
  const remainingCalories = totalCalories - numericConsumedCalories;
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [errMessage, setErrMessage] = useState<string |null>(null)

  // Update the chart when consumedCalories changes
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const data = {
          labels: ['Consumed Calories', 'Remaining Calories'],
          datasets: [{
            data: [numericConsumedCalories, totalCalories - numericConsumedCalories],
            backgroundColor: ['#90EE90', '#77DD77'],
          }]
        };

        const options = {
          responsive: true,
          maintainAspectRatio: false,
        };

        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: 'pie' as ChartType,
          data: data,
          options: options,
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [numericConsumedCalories]);

  const handleConsumedCaloriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) && Number(e.target.value) < 2000) {
      setConsumedCalories(e.target.value);
    }
  };

  return (
    <div className={`${styles.chartContainer} ${styles.canvasContainer}`}>

      <canvas ref={chartRef}></canvas>
      <div>
        <label>Consumed Calories:</label>
        <input
          type="number"
          value={consumedCalories}
          onChange={handleConsumedCaloriesChange}
        />
      </div>
      <div className={styles.caloriesInfo}>
        <p>Total calories for today: 2000 kcal</p>
        {numericConsumedCalories > 0 && <p>Calories you consumed: {numericConsumedCalories} kcal</p>}
        <p>Calories remain: {remainingCalories} kcal</p>
      </div>
    </div>
  );
};

export default CaloriesChartComponent;
