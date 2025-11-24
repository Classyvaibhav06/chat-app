# SETUP GUIDE - Backend Server Setup

## Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Get Gemini API Key
1. Go to https://ai.google.dev
2. Click "Get API Key"
3. Create a new API key
4. Copy it

### Step 3: Add API Key to .env
Edit `.env` file and add your key:
```
GEMINI_API_KEY=paste_your_key_here
PORT=5000
```

### Step 4: Start Server
```bash
npm start
```

You should see: `Server is running on http://localhost:5000`

### Step 5: Use the App
Open http://localhost:5000 in your browser and start chatting!

---

## How It Works

Your API key is **never** sent to the browser. It stays safe on the backend server.

### Without Backend (❌ Not Secure)
- Browser has API key in localStorage
- Anyone with access to your computer can see it

### With Backend (✅ Secure)
- Backend server stores API key safely
- Browser only sends/receives messages
- API key never exposed to frontend

---

## Commands

```bash
npm start      # Start server (production)
npm run dev    # Start with auto-reload (development)
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to backend server" | Run `npm start` first |
| "GEMINI_API_KEY is not set" | Add key to `.env` file |
| "Port 5000 already in use" | Change PORT in `.env` to 5001 |

---

## What's New

✅ `server.js` - Backend API server  
✅ `package.json` - Dependencies (express, cors, dotenv)  
✅ `.env` - API key configuration (gitignored)  
✅ `.gitignore` - Never commit `.env` file  

Your `app.js`, `index.html`, and `style.css` have been updated to use the backend!
