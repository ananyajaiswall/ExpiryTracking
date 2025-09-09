# Expiry Tracking System - PantryPal

A smart inventory management solution to track product expiry dates, reduce waste, and improve operational efficiency for retailers and warehouses.

---

## ✨ Features

-  Add and manage products with details like **name, batch number, expiry date, category, and barcode**  
-  Scan by **barcode** or **batch number** to fetch product details and expiry alerts  
-  Automated status updates: *Fresh*, *Nearing Expiry*, *Expired*  
-  Daily inventory reports generated automatically via cron jobs  
-  Actions like **discount, donate, or remove** expired items with action history logging  
-  Clean and responsive **React Native frontend** with real-time backend integration  

---

## 🛠️ Tech Stack

**Frontend**: React Native (Expo)  
**Backend**: Node.js + Express  
**Database**: MongoDB (Atlas)  
**Scheduler**: Node-cron for automated updates & reports  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/expiry-tracker.git
cd expiry-tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a .env file and add:
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/expirytracker
```
Start the backend:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```
Add an .env file in the frontend folder:
```bash
EXPO_PUBLIC_API_URL=http://<your-local-ip>:5000/api
```
Run the frontend:
```bash
npx expo start
```

Scan the QR code with Expo Go app to run on your phone.

### 🎥 Project Walkthrough (Video)

A detailed explanation of the system is available in this video:






https://github.com/user-attachments/assets/7404f26a-f86c-467a-b07a-42f0e4c1a0c0







### 📌 Future Enhancements

- OCR integration for auto-fetching product details from labels
- Role-based access for staff & admins
- Push notifications for urgent expiry alerts
- Advanced analytics dashboard




