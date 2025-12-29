require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const Transaction = require('./models/Transaction');
const calculateRisk = require('./utils/aiRiskAnalyzer');
const dummyTransactions = require('./utils/dummyData');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// =========================
// DB CONNECTION
// =========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

// =========================
// SORT TRANSACTIONS BY TIME
// =========================
const sortedTransactions = [...dummyTransactions].sort(
  (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
);

// =========================
// STATE STORAGE
// =========================
const userStates = {};
let index = 0;

// =========================
// SOCKET LOGIC (SINGLE CLIENT SAFE)
// =========================
io.on('connection', (socket) => {
  console.log('🟢 Client connected:', socket.id);

  const interval = setInterval(async () => {
    try {
      const baseData = sortedTransactions[index];
      const userId = baseData.userId;

      const lastState = userStates[userId] || null;

      // AI ANALYSIS
      const analysis = calculateRisk(baseData, lastState);

      // UPDATE USER HISTORY
      userStates[userId] = {
        location: baseData.location,
        device: baseData.device,
        timestamp: baseData.timestamp
      };

      const finalTransaction = {
        ...baseData,
        riskScore: analysis.riskScore,
        riskLevel: analysis.riskLevel,
        reason: analysis.reason
      };

      await Transaction.create(finalTransaction);

      socket.emit('newTransaction', finalTransaction);

      index = (index + 1) % sortedTransactions.length;

    } catch (err) {
      console.error('❌ Engine error:', err.message);
    }
  }, 2000);

  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('🔴 Client disconnected:', socket.id);
  });
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on ${PORT}`)
);
