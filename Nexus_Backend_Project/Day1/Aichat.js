const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function main(msg) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: msg
  });

  return response.text;
}

module.exports = main;
// got to the  google ai studio and create api key for gemini model and paste it in the .env file
