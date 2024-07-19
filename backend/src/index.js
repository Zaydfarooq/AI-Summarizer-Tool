const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const fs = require('fs').promises;
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

const openaiApiKey = process.env.OPENAI_API_KEY;

app.post('/api/upload', upload.single('file'), async (req, res) => {
  const filePath = path.join(__dirname, '..', req.file.path);

  try {
    const content = await fs.readFile(filePath, 'utf8');

    // Call OpenAI API for summarization
    const summaryResponse = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `Summarize the following text:\n\n${content}`,
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        },
      }
    );

    const summary = summaryResponse.data.choices[0].text.trim();

    // Call OpenAI API for extracting insights
    const insightsResponse = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `Extract key insights and entities from the following text:\n\n${content}`,
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        },
      }
    );

    const insights = insightsResponse.data.choices[0].text.trim();

    res.json({ summary, insights });

    // Clean up the uploaded file
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Error calling OpenAI API:', error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to process text' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
