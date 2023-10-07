import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CaloriesChartComponent: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

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

        new Chart(ctx, {
          type: 'pie',
          data: data,
          options: options,
        });
      }
    }
  }, []); // Empty dependency array ensures the effect runs once after initial render

  return <canvas ref={chartRef} width={200} height={200}></canvas>;
};

export default CaloriesChartComponent;
