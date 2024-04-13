import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ArtisanOverviewChart = ({ data }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const chartInstance = chartRef.current;
    const context = chartInstance.getContext('2d');

    // Ensure the canvas is empty before rendering the chart
    context.clearRect(0, 0, chartInstance.width, chartInstance.height);

    // Render the chart
    const chart = new Chart(context, {
      type: 'line',
      data: data,
      options: {
        animation: {
          duration: 1000,
          easing: 'easeInOutQuad',
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Month',
              font: {
                size: 16, // Increase font size for better visibility
              },
            },
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 14,
              },
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Number of Artisans',
              font: {
                size: 16, // Increase font size for better visibility
              },
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            },
            ticks: {
              font: {
                size: 14,
              },
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    setChartInstance(chart);

    // Cleanup function to destroy the chart when component unmounts
    return () => {
      chart.destroy();
    };
  }, [data]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (chartInstance) {
        chartInstance.resize();
      }
    });

    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [chartInstance]);

  return (
    <div className="relative w-full h-96">
      <canvas ref={chartRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default ArtisanOverviewChart;
1