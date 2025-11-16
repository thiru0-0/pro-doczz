// index.js
require('dotenv').config(); // This loads the .env file

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3001; // Port 3001 is a good choice

// --- Middleware ---
app.use(cors()); // Allow requests from your frontend
app.use(express.json()); // Allow the server to read JSON from requests

// --- Initialize OpenAI ---
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY, // Support both env var names
});

// --- Test Route ---
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// --- Your REAL API Endpoint ---
app.post('/api/generate-summary', async (req, res) => {
  try {
    // 1. Get the data from your frontend
    const { notes, context } = req.body; 
    // context is { role, skills, type }

    // 2. Build the same prompts we discussed for the frontend
    let systemPrompt = "";
    let userQuery = "";

    if (context.type === 'fresherSummary') {
      systemPrompt = "You are an expert career coach. The user is a fresher. Turn their notes into a concise, 2-3 sentence professional summary for a resume. Focus on their skills and career goals. The tone should be confident and professional.";

      userQuery = `Here are my notes: "${notes || 'None'}" My skills are: "${context.skills || 'Not specified'}". My career goal is: "${context.role || 'Not specified'}"`;

      if (!notes) {
        userQuery = `Generate a professional summary for a fresher whose skills are "${context.skills || 'Not specified'}" and is looking for a role like "${context.role || 'Not specified'}".`;
      }
    } else if (context.type === 'experienceSummary') {
      systemPrompt = "You are an expert resume writer. Turn these notes about a job role into 3-4 professional bullet points for a resume. Start each bullet with a strong action verb (e.g., 'Led', 'Developed', 'Optimized'). Format the output as bullet points starting with a hyphen. Do not use markdown's `*`.";

      userQuery = `My role was: "${context.role || 'Not specified'}". My notes are: "${notes || 'None'}". My relevant skills are: "${context.skills || 'Not specified'}".`;

      if (!notes) {
        userQuery = `Generate 3-4 professional bullet points for a resume for a "${context.role || 'Not specified'}" role, focusing on common achievements for someone with skills in "${context.skills || 'Not specified'}".`;
      }
    } else {
      // Default: treat as experience summary if type is not specified
      systemPrompt = "You are an expert resume writer. Turn these notes about a job role into 3-4 professional bullet points for a resume. Start each bullet with a strong action verb (e.g., 'Led', 'Developed', 'Optimized'). Format the output as bullet points starting with a hyphen. Do not use markdown's `*`.";
      userQuery = `My role was: "${context.role || 'Not specified'}". My notes are: "${notes || 'None'}". My relevant skills are: "${context.skills || 'Not specified'}".`;
    }

    // 3. Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userQuery }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const summaryText = completion.choices[0].message.content.replace(/\*/g, ''); // Clean the text

    // 4. Send the result back to your frontend
    res.json({ summary: summaryText });

  } catch (error) {
    console.error("Error in /api/generate-summary:", error);
    res.status(500).json({ error: "Failed to generate summary", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  // Test log
  if (process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY) {
    console.log("API Key loaded successfully!");
  } else {
    console.error("ERROR: API Key not found. Check your .env file.");
  }
});

