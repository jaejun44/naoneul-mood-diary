// src/components/StatsChart.jsx
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Chart.js 모듈 등록
ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatsChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const emotionCounts = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        const value = JSON.parse(localStorage.getItem(key));
        const emo = value?.emotion;
        if (emo) {
          emotionCounts[emo] = (emotionCounts[emo] || 0) + 1;
        }
      } catch (e) {
        continue;
      }
    }

    const labels = Object.keys(emotionCounts);
    const data = Object.values(emotionCounts);

    setChartData({
      labels,
      datasets: [
        {
          label: '감정 비율',
          data,
          backgroundColor: [
            '#FFB6C1',
            '#87CEFA',
            '#FFD700',
            '#90EE90',
            '#FF8C00',
            '#DDA0DD',
          ],
          borderWidth: 1,
        },
      ],
    });
  }, []);

  if (!chartData) return null;

  return (
    <div style={{ width: '80%', maxWidth: '400px', margin: '2rem auto' }}>
      <h3 style={{ textAlign: 'center' }}>감정 비율 차트</h3>
      <Pie data={chartData} />
    </div>
  );
}