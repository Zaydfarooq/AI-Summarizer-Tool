// backend/src/upload.js

const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = express.Router();

require('dotenv').config(); // Ensure this line is present to load environment variables

console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Call the AI service to get the summary and insights
    const response = await axios.post('https://api.openai.com/completions', {
      model: 'text-davinci-003',
      prompt: fileContent,
      max_tokens: 150,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    // Send response back to the client
    res.json({
      summary: response.data.choices[0].text || '',
      insights: response.data.choices[0].text || ''
    });
  } catch (error) {
    console.error('Error processing file:', error.message);
    res.status(500).json({ error: 'An error occurred while processing the file.' });
  }
});

module.exports = router;
