/**
 * Clean, Stateless AI Risk Engine
 * lastState holds previous transaction info per user
 */
function calculateRisk(transaction, lastState = null) {
  let riskScore = 0;
  const reasons = [];

  // =========================
  // AMOUNT ANALYSIS
  // =========================
  if (transaction.amount >= 1800) {
    riskScore += 60;
    reasons.push('Very High Spending');
  } else if (transaction.amount >= 1000) {
    riskScore += 30;
    reasons.push('High Spending');
  }

  // =========================
  // BEHAVIOR ANALYSIS
  // =========================
  if (lastState) {
    // Geo change
    if (lastState.location && lastState.location !== transaction.location) {
      riskScore += 30;
      reasons.push('Geo-Anomaly');
    }

    // Device change
    if (lastState.device && lastState.device !== transaction.device) {
      riskScore += 20;
      reasons.push('New Device');
    }

    // Rapid Velocity: 40 sec – 2 min window
    if (lastState.lastTimestamp) {
      const diffSeconds = (new Date(transaction.timestamp) - new Date(lastState.lastTimestamp)) / 1000;
      if (diffSeconds > 0 && diffSeconds <= 120) { // 2 min = 120 sec
        riskScore += 25;
        reasons.push('Rapid Velocity');
      }
    }
  }

  // =========================
  // NORMALIZATION
  // =========================
  riskScore = Math.min(riskScore, 100);

  let riskLevel = 'LOW';
  if (riskScore >= 75) riskLevel = 'HIGH';
  else if (riskScore >= 40) riskLevel = 'MEDIUM';

  return {
    riskScore,
    riskLevel,
    reason: reasons.length ? reasons.join(' • ') : 'Normal Behavior'
  };
}

module.exports = calculateRisk;
/*
Using Gemini Api
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI-Assisted Risk Engine (Gemini)
// Hybrid: Rule-based + AI reasoning
async function calculateRisk(transaction, lastState = null) {
    let riskScore = 0;
    const reasons = [];

    // RULE-BASED CORE (FAST & RELIABLE)
    if (transaction.amount >= 1800) {
        riskScore += 60;
        reasons.push('Very High Spending');
    } else if (transaction.amount >= 1000) {
        riskScore += 30;
        reasons.push('High Spending');
    }

    if (lastState) {
        if (lastState.location !== transaction.location) {
            riskScore += 30;
            reasons.push('Geo-Anomaly');
        }

        if (lastState.device !== transaction.device) {
            riskScore += 20;
            reasons.push('New Device');
        }

        if (lastState.lastTimestamp) {
            const diffSeconds =
                (new Date(transaction.timestamp) - new Date(lastState.lastTimestamp)) / 1000;

            if (diffSeconds >= 40 && diffSeconds <= 120) {
                riskScore += 25;
                reasons.push('Rapid Velocity');
            }
        }
    }

    // AI CONTEXT BOOST (OPTIONAL)
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const prompt = `
Analyze this transaction risk contextually.
Respond with ONLY one number between 0 and 15.

Transaction:
Amount: ${transaction.amount}
Location: ${transaction.location}
Device: ${transaction.device}
Time: ${transaction.timestamp}

Higher score means higher suspicion.
`;

        const result = await model.generateContent(prompt);
        const aiScore = parseInt(result.response.text().trim());

        if (!isNaN(aiScore)) {
            riskScore += aiScore;
            reasons.push('AI Behavioral Insight');
        }

    } catch (err) {
        // Silent fallback
    }

    // NORMALIZATION
    riskScore = Math.min(riskScore, 100);

    let riskLevel = 'LOW';
    if (riskScore >= 75) riskLevel = 'HIGH';
    else if (riskScore >= 40) riskLevel = 'MEDIUM';

    return {
        riskScore,
        riskLevel,
        reason: reasons.length ? reasons.join(' • ') : 'Normal Behavior'
    };
}

module.exports = calculateRisk;
*/
