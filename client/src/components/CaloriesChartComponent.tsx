// 'use client'

// import React, { useEffect, useRef } from 'react';
// import Chart, {ChartType} from 'chart.js/auto';

// const CaloriesChartComponent: React.FC = () => {
//   const chartRef = useRef<HTMLCanvasElement | null>(null);
//   const chartInstance = useRef<Chart | null>(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       const ctx = chartRef.current.getContext('2d');
//       if (ctx) {
//         const data = {
//           labels: ['Consumed Calories', 'Remaining Calories'],
//           datasets: [{
//             data: [150, 1850], // Consumed and remaining calories
//             backgroundColor: ['#FF5733', '#3498DB'],
//           }]
//         };

//         const options = {
//           responsive: true,
//           maintainAspectRatio: false,
//         };

//         if (chartInstance.current) {
//           chartInstance.current.destroy();
//         }

//         chartInstance.current = new Chart(ctx, {
//           type: 'pie' as ChartType,
//           data: data,
//           options: options,
//         });
//       }
//     }
//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, []);

//   return <canvas ref={chartRef} width={200} height={200}></canvas>;
// };

// export default CaloriesChartComponent;


'use client'

import React, { useEffect, useRef, useState } from 'react';
import Chart, { ChartType } from 'chart.js/auto';
import styles from '../styles/caloriesChartComponent.module.css'; // Import your CSS module

const CaloriesChartComponent: React.FC = () => {
  const [consumedCalories, setConsumedCalories] = useState<number>(150);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Update the chart when consumedCalories changes
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const data = {
          labels: ['Consumed Calories', 'Remaining Calories'],
          datasets: [{
            data: [consumedCalories, 2000 - consumedCalories], // Total calories assumed to be 2000
            backgroundColor: ['#FF5733', '#3498DB'],
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

    // Cleanup chart when component is unmounted
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [consumedCalories]); // Re-run effect when consumedCalories changes

  const handleConsumedCaloriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setConsumedCalories(value);
    }
  };

  return (
    <div className={`${styles.chartContainer} ${styles.canvasContainer}`}>
      <div>
        <label>Consumed Calories:</label>
        <input
          type="number"
          value={consumedCalories}
          onChange={handleConsumedCaloriesChange}
        />
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default CaloriesChartComponent;
