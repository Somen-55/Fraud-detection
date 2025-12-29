import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/dashboard.css';

const getRiskColor = (score) => {
  if (score >= 70) return '#ef4444';   // red
  if (score >= 40) return '#facc15';   // yellow
  return '#22c55e';                    // green
};

export default function TransactionTable() {
  const transactions = useSelector(state => state.transactions);

  return (
    <div className="card table-section">
      <h3>Live Transaction Ledger</h3>

      <div className="table-wrapper">
        <table className="fraud-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Amount</th>
              <th>Time</th>
              <th>Risk</th>
              <th>AI Analysis Reason</th>
            </tr>
          </thead>

          <tbody>
            {[...transactions].reverse().map((t, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{t.userId}</td>

                <td>₹{t.amount.toLocaleString()}</td>

                <td style={{ color: '#94a3b8' }}>
  {new Date(t.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
</td>

                {/* ✅ CLEAN RISK INDICATOR */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: getRiskColor(t.riskScore),
                        display: 'inline-block'
                      }}
                    />
                    <span style={{ fontSize: 13, color: '#cbd5f5' }}>
                      {t.riskScore}
                    </span>
                  </div>
                </td>

                {/* ✅ CLEAN REASON */}
                <td className="reason-column">
                  {t.reason || 'Normal Behavior'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
