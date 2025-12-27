import React from 'react';
import { useSelector } from 'react-redux';

export default function Alerts() {
  const transactions = useSelector(state => state.transactions);
  const highRisk = transactions.filter(t => t.riskScore > 70);

  return (
    <div>
      <h3>High Risk Alerts</h3>
      {highRisk.map((t,i) => (
        <div key={i} style={{ color: 'red' }}>
          {t.userId} - Risk: {t.riskScore}
        </div>
      ))}
    </div>
  );
}
