require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");
const readlineSync = require('readline-sync');

// node-fetch fix (same style)
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const ConversationHistory = [];

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: ConversationHistory
  });

  return response.candidates[0].content.parts[0].text;
}

// Weather leke aayega function 
async function getWheather(location){

  const weatherInfo = [];

  for(const { city, date } of location){

    if(date.toLowerCase() == 'today'){
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`
      );
      const data = await response.json();
      weatherInfo.push(data);
    }
    else{
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=3`
      );
      const data = await response.json();
      weatherInfo.push(data);
    }
  }

  return weatherInfo;
}

async function chatting(){

  const question = readlineSync.question('How I can Help You--> ');

  const prompt = `
Your are an AI agent, who will respond to me in JSON format only.
Analyse the user query and try to fetch city and date details from it.
Date format should be in (yyy-month-date) if user ask for future weather.
If user ask for today weather, mark date as 'today'.
To fetch weather details, I already have some function which can fetch the weather details for me,

if you need weather information, use the below format
JSON format should look like below:
{
 "weather_details_needed": true,
 "location": [{"city":"Mumbai","date":"today"},{"city":"Delhi","date":"2026-01-24"}]
}

Once you have the weather report details, respond me in JSON format only.
JSON format should look like below:
{
 "weather_details_needed": false,
 "weather_report": "Bhai Delhi ka mausam toh badhiya hai, 18 degree temperature hai, ghar pe pakode bana lo, maja aayega khane mein"
}

User asked this question:${question}

Strictly follow JSON format, respond only in JSON format, don't add extra space or comment in JSON format, please follow these rule 
`;

  ConversationHistory.push({
    role:"user",
    parts:[{ text: prompt }]
  });

  try {
    let response = await main();

    // remove ```json fences if Gemini adds them
    response = response.replace(/^```json\s*|```$/g, '').trim();

    const data = JSON.parse(response);
    console.log(data);

  } catch (err) {
    console.log(" Error parsing Gemini response");
    console.log(err.message);
  }
}

chatting();
