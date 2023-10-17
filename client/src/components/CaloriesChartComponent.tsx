import React, { useEffect, useRef } from 'react';
import Chart, { ChartType } from 'chart.js/auto';
import styles from '../styles/caloriesChartComponent.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setConsumedCalories } from '@/slices/caloriesChartSlice';

const CaloriesChartComponent: React.FC = () => {
  const consumedCalories = useAppSelector(
    state => state.caloriesChart.consumedCalories
  );
  const totalCalories = 2000;
  const numericConsumedCalories =
    consumedCalories !== '' ? parseInt(consumedCalories, 10) : 0;
  const remainingCalories = totalCalories - numericConsumedCalories;
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const dispatch = useAppDispatch();

  // Update the chart when consumedCalories changes
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        Chart.defaults.color = '#000';
        const data = {
          labels: ['Consumed Calories', 'Remaining Calories'],
          datasets: [
            {
              data: [
                numericConsumedCalories,
                totalCalories - numericConsumedCalories,
              ],
              backgroundColor: ['#8DE425', '#02684a'],
            },
          ],
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

  const handleConsumedCaloriesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (Number(e.target.value) && Number(e.target.value) < 2000) {
      dispatch(setConsumedCalories(e.target.value));
    }
  };

  return (
    <>
      <div className={styles['calories-chart-container']}>
        <div className={`${styles.chartContainer} ${styles.canvasContainer}`}>
          <canvas ref={chartRef}></canvas>
        </div>
        <div className={styles['item-form']}>
          <label>Consumed Calories:</label>
          <input
            type='number'
            value={consumedCalories}
            onChange={handleConsumedCaloriesChange}
          />
        </div>
        <div className={styles.caloriesInfo}>
          <p>
            Total calories for today: <span>2000 kcal</span>
          </p>
          {numericConsumedCalories > 0 && (
            <p>
              Calories you consumed: <span>{numericConsumedCalories} kcal</span>
            </p>
          )}
          <p>
            Calories remaining: <span>{remainingCalories} kcal</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CaloriesChartComponent;
