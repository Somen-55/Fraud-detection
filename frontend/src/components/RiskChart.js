import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function RiskChart() {
  const transactions = useSelector(state => state.transactions);
  const labels = transactions.map(t => new Date(t.timestamp).toLocaleTimeString()).reverse();
  const data = transactions.map(t => t.riskScore).reverse();

  return (
    <Line
      data={{
        labels,
        datasets: [{ label: 'Risk Score', data, borderColor: 'red', tension: 0.3 }]
      }}
    />
  );
}
