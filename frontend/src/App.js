import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import TransactionTable from './components/TransactionTable';
import RiskChart from './components/RiskChart';
import Alerts from './components/Alerts';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('newTransaction', data => {
      dispatch({ type: 'ADD_TRANSACTION', payload: data });
    });
  }, [dispatch]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Fraud Detection Dashboard</h1>
      <Alerts />
      <RiskChart />
      <TransactionTable />
    </div>
  );
}
