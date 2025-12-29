import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/dashboard.css';

export default function Alerts() {
  const transactions = useSelector(state => state.transactions);
  const highRisk = transactions.filter(t => t.riskScore > 70);

  return (
    <div className="card">
      <h3>Security Alerts</h3>
      {highRisk.length === 0 ? (
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>System secured. No threats detected.</p>
      ) : (
        highRisk.map((t, i) => (
          <div key={i} className="alert-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '5px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{t.userId}</span>
              <span style={{ fontWeight: 800, color: '#ff4d4d' }}>{t.riskScore}</span>
            </div>
            <div className="ai-reason">
              <strong>AI Flag:</strong> {t.reason}
            </div>
          </div>
        ))
      )}
    </div>
  );
}