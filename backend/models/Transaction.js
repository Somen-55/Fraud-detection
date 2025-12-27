const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
  riskScore: Number,
  riskLevel: String,
  reason: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);
