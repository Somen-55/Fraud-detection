const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const Transaction = require('./models/Transaction');
const jwtAuth = require('./utils/jwtAuth');
const authRoutes = require('./routes/auth');
const calculateRisk = require('./utils/aiRiskAnalyzer');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

/* =========================
   ROUTES
========================= */
app.use('/auth', authRoutes);

// Get last 50 transactions (secured)
app.get('/transactions', jwtAuth, async (req, res) => {
  try {
    const transactions = await Transaction
      .find()
      .sort({ timestamp: -1 })
      .limit(50);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

/* =========================
   DATABASE CONNECTION
========================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

/* =========================
   SOCKET.IO – REAL-TIME AI TRANSACTIONS
========================= */
io.on('connection', (socket) => {
  console.log('🟢 Client connected:', socket.id);

  const interval = setInterval(async () => {
    try {
      // Step 1: Create transaction data
      const transactionData = {
        userId: 'user_' + Math.floor(Math.random() * 10),
        amount: Math.floor(Math.random() * 2000),
        timestamp: new Date()
      };

      // Step 2: AI risk calculation
      const riskScore = await calculateRisk(transactionData);

      let riskLevel = 'Low';
      if (riskScore > 70) riskLevel = 'High';
      else if (riskScore > 40) riskLevel = 'Medium';

      // Step 3: Final transaction object
      const transaction = {
        ...transactionData,
        riskScore,
        riskLevel,
        reason:
          riskLevel === 'High'
            ? 'Unusual transaction pattern detected'
            : riskLevel === 'Medium'
            ? 'Moderate risk behavior'
            : 'Normal transaction'
      };

      // Step 4: Save to DB
      await Transaction.create(transaction);

      // Step 5: Emit live to frontend
      socket.emit('newTransaction', transaction);

    } catch (err) {
      console.error('AI transaction error:', err.message);
    }
  }, 4000); // every 4 seconds

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
    clearInterval(interval);
  });
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(` Backend running on port ${PORT}`)
);
