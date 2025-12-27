import React from 'react';
import { useSelector } from 'react-redux';

export default function TransactionTable() {
  const transactions = useSelector(state => state.transactions);

  return (
    <table
      border="1"
      cellPadding="10"
      style={{ width: '100%', borderCollapse: 'collapse' }}
    >
      <thead style={{ background: '#f2f2f2' }}>
        <tr>
          <th>User</th>
          <th>Amount</th>
          <th>Timestamp</th>
          <th>Risk Score</th>
          <th>Risk Level</th>
          <th>AI Reason</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((t, i) => {
          let rowColor = '#ffffff';
          if (t.riskLevel === 'High') rowColor = '#ffcccc';
          else if (t.riskLevel === 'Medium') rowColor = '#fff3cd';

          return (
            <tr key={i} style={{ background: rowColor }}>
              <td>{t.userId}</td>
              <td>₹{t.amount}</td>
              <td>{new Date(t.timestamp).toLocaleTimeString()}</td>
              <td>{t.riskScore}</td>
              <td>
                <strong>{t.riskLevel}</strong>
              </td>
              <td>{t.reason}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
