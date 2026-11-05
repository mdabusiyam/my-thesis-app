const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// ML Endpoint: Connects to Groq Premade Model (Llama 3.1)
app.post('/api/analyze', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Please provide a text prompt." });
    }

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are an AI assistant. Analyze the input text and respond in one short sentence.' },
          { role: 'user', content: text }
        ],
        temperature: 0.2
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiAnswer = response.data.choices[0].message.content.trim();
    res.json({ input: text, model_response: aiAnswer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint for CI pipeline
app.get('/health', (req, res) => {
  res.json({ status: 'ML Model API Service Running Healthy' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`ML App running on port ${PORT}`));
}

module.exports = app;
