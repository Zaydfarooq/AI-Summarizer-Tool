// backend/src/test-openai.js

require('dotenv').config();
const axios = require('axios');

const testOpenAI = async () => {
  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003',
      prompt: 'Test prompt',
      max_tokens: 50,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('API Response:', response.data);
  } catch (error) {
    console.error('Error calling OpenAI API:', error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
    }
  }
};

testOpenAI();
