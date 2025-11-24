const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Store API key from environment variable
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('ERROR: GEMINI_API_KEY environment variable is not set');
  console.error('Please create a .env file with GEMINI_API_KEY=your_key_here');
  process.exit(1);
}

console.log('✓ API Key loaded:', GEMINI_API_KEY.substring(0, 10) + '...');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Chat endpoint - handles all Gemini API calls
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model, temperature, maxOutputTokens } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (!model) {
      return res.status(400).json({ error: 'Model is required' });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
    console.log('Calling Gemini API:', url.substring(0, 80) + '...');

    // Call Google Gemini API with the protected API key
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: temperature || 0.7,
          maxOutputTokens: maxOutputTokens || 2000,
          topP: 1,
          topK: 40
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      return res.status(response.status).json(data);
    }

    console.log('✓ Response received from Gemini');
    // Extract the response text
    const responseText = data.candidates[0].content.parts[0].text;
    res.json({ content: responseText });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('API key is protected and never exposed to the frontend');
});
