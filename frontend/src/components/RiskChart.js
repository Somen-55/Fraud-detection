import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import '../styles/dashboard.css';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

export default function RiskChart() {
  const transactions = useSelector(state => state.transactions);
  const labels = transactions.map(t => new Date(t.timestamp).toLocaleTimeString()).reverse();
  const dataValues = transactions.map(t => t.riskScore).reverse();

  const chartData = {
    labels,
    datasets: [{
      label: 'Risk Level',
      data: dataValues,
      fill: true,
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#6366f1',
    }]
  };

  return (
    <div className="card">
      <h3>Risk Probability Trend</h3>
      <Line 
        data={chartData} 
        options={{
          responsive: true,
          scales: {
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
            x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
          },
          plugins: { legend: { display: false } }
        }} 
      />
    </div>
  );
}