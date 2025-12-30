
# 📊 Real-Time Fraud Detection Dashboard

A real-time web dashboard for monitoring e-commerce transactions and detecting suspicious activity using a rule-based fraud detection engine.
The system is designed to be **AI-ready** and simulates real-world fraud scenarios using realistic dummy data.

---

## 🚀 Features

* Real-time transaction updates using **Socket.io**
* Live fraud risk scoring (0–100)
* Fraud reason generation (High Spending, Geo-Anomaly, New Device, etc.)
* Alerts for high-risk transactions
* Fully functional without external AI APIs

---

## 🧠 Fraud Detection Logic

The fraud detection system uses a **rule-based scoring engine** similar to what is used in real financial systems.

### Risk factors considered:

* Transaction amount
* Sudden location change (Geo-Anomaly)
* New device usage
* Unusual behavior patterns

Each factor contributes to a final **risk score between 0 and 100**, along with a clear explanation for the score.

---

## 🤖 OpenAI Integration (Optional)

This project is **OpenAI-ready**, but does not require an OpenAI API key to run.

* Due to API access limitations, **dummy data and rule-based logic** are used to simulate AI behavior
* The architecture allows easy integration of OpenAI or other LLMs in the future
* This approach ensures explainability, reliability, and cost efficiency

---

## 🧪 Dummy Data Simulation

The system generates realistic dummy transactions to simulate:

* Normal user activity
* High-value transactions
* Cross-location usage
* Device changes

This allows full demonstration of fraud detection without relying on live payment data or paid APIs.

---

## 🛠️ Tech Stack

**Frontend**

* React.js
* Socket.io Client
* Chart.js

**Backend**

* Node.js
* Express.js
* MongoDB
* Socket.io
* JWT (optional / ready)

---

## ⚙️ Setup Instructions

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/fraud_dashboard
JWT_SECRET=JWT_SECRET=9f8a7d6c5b4e3a2f1d0eJWTsecret!@#
```

> `OPENAI_API_KEY` is optional and not required to run this project.

---

## ✅ Assignment Coverage

* Real-time data streaming
* Fraud risk scoring
* Alert system
* Scalable backend architecture
* AI-ready design
* Clear and explainable logic

---

## 👨‍💻 Author

**Somen Sarangi**

---

### 💡 Note for Reviewers

This project demonstrates how real-world fraud systems work by combining deterministic rule engines with optional AI integration.
The absence of a live OpenAI key does not affect functionality or evaluation.

