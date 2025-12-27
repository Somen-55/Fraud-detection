
require('dotenv').config();

const OpenAI = require('openai');


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function calculateRisk(transaction) {
  try {
    const prompt = `
You are a fraud detection system.
Analyze the transaction and return ONLY a number between 0 and 100.

Transaction:
User ID: ${transaction.userId}
Amount: ${transaction.amount}
Time: ${transaction.timestamp}

Rules:
- High amount → higher risk
- Unusual behavior → higher risk
- Normal activity → lower risk

Return only the number.
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2
    });

    const score = parseInt(response.choices[0].message.content.trim());
    return isNaN(score) ? 50 : score;

  } catch (error) {
    console.error('❌ OpenAI Error:', error.message);
    return 50; // fallback score if AI fails
  }
}

module.exports = calculateRisk;
