const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Dummy login
router.post('/login', (req, res) => {
  const { username } = req.body;
  const role = username === 'admin' ? 'admin' : 'user';
  const token = jwt.sign({ username, role }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

module.exports = router;
