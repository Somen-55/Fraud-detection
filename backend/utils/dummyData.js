const dummyTransactions = [
  { userId: 'user_1', amount: 350, timestamp: '2025-12-28T01:10:00Z', location: 'India', device: 'Android' },
  { userId: 'user_2', amount: 1200, timestamp: '2025-12-28T01:40:00Z', location: 'USA', device: 'Web' },
  { userId: 'user_3', amount: 400, timestamp: '2025-12-28T02:15:00Z', location: 'India', device: 'Android' },
  { userId: 'user_1', amount: 1900, timestamp: '2025-12-28T02:45:00Z', location: 'Germany', device: 'iOS' },
  { userId: 'user_4', amount: 600, timestamp: '2025-12-28T03:30:00Z', location: 'India', device: 'Web' },
  { userId: 'user_5', amount: 1700, timestamp: '2025-12-28T04:05:00Z', location: 'USA', device: 'Android' },
  { userId: 'user_2', amount: 300, timestamp: '2025-12-28T04:45:00Z', location: 'USA', device: 'Web' },
  { userId: 'user_6', amount: 1400, timestamp: '2025-12-28T05:20:00Z', location: 'Singapore', device: 'iOS' },
  { userId: 'user_7', amount: 500, timestamp: '2025-12-28T06:10:00Z', location: 'India', device: 'Android' },
  { userId: 'user_3', amount: 1850, timestamp: '2025-12-28T06:40:00Z', location: 'Germany', device: 'Web' },

  { userId: 'user_8', amount: 750, timestamp: '2025-12-28T07:25:00Z', location: 'India', device: 'Android' },
  { userId: 'user_9', amount: 1600, timestamp: '2025-12-28T08:00:00Z', location: 'USA', device: 'iOS' },
  { userId: 'user_10', amount: 900, timestamp: '2025-12-28T08:45:00Z', location: 'India', device: 'Web' },
  { userId: 'user_4', amount: 200, timestamp: '2025-12-28T09:10:00Z', location: 'India', device: 'Android' },
  { userId: 'user_5', amount: 1950, timestamp: '2025-12-28T09:40:00Z', location: 'Germany', device: 'iOS' },

  // continue randomness (realistic)
  ...Array.from({ length: 35 }).map((_, i) => ({
    userId: `user_${(i % 10) + 1}`,
    amount: Math.floor(Math.random() * 1800) + 200,
    timestamp: new Date(Date.now() + i * 60000).toISOString(),
    location: ['India', 'USA', 'Germany', 'Singapore'][Math.floor(Math.random() * 4)],
    device: ['Android', 'iOS', 'Web'][Math.floor(Math.random() * 3)]
  }))
];

module.exports = dummyTransactions;
