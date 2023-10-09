'use client'

import React, { useEffect, useRef } from 'react';
import Chart, { ChartType } from 'chart.js/auto';
import styles from '@/styles/caloriesChart.module.css';

const CaloriesChartComponent: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const data = {
          labels: ['Consumed Calories', 'Remaining Calories'],
          datasets: [{
            data: [150, 1850], // Consumed and remaining calories
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
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <section className={styles['chart-container']}>
      <h1>Your Calories Chart</h1>
      <canvas ref={chartRef} width={300} height={300}></canvas>
    </section>
  );
};

export default CaloriesChartComponent;
