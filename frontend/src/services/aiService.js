// src/services/aiService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/ai-assistant';

export const getAIResponse = async (prompt) => {
  try {
    const response = await axios.post(API_URL, { prompt });
    return response.data.response;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
};