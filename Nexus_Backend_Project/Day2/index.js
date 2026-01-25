require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const readlineSync = require("readline-sync");


const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const ConversationHistory = [];


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function main() {
  const promptText = ConversationHistory
    .map(m => m.parts[0].text)
    .join("\n");

  const result = await model.generateContent(promptText);
  return result.response.text();
}


async function getWheather(location) {

  const weatherInfo = [];

  for (const { city, date } of location) {

    if (date.toLowerCase() === "today") {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`
      );
      const data = await response.json();
      weatherInfo.push(data);
    } else {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=3`
      );
      const data = await response.json();
      weatherInfo.push(data);
    }
  }

  return weatherInfo;
}
async function chatting() {

  const question = readlineSync.question("How I can Help You--> ");

  
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
If I have provided you weather details of delhi and you have enough information about them,make the summary of weather report and return it o me like below.
JSON format should look like below:
{
 "weather_details_needed": false,
 "weather_report": "Bhai Delhi ka mausam toh badhiya hai, 18 degree temperature hai, ghar pe pakode bana lo, maja aayega khane mein"
}

User asked this question:${question}

Strictly follow JSON format, respond only in JSON format, don't add extra space or comment in JSON format, please follow these rule 
`;

  ConversationHistory.push({
    role: "user",
    parts: [{ text: prompt }]
  });

  for (let i = 0; i < 3; i++) {

    let responseText;
    try {
      responseText = await main();
    } catch (err) {
      console.log("Gemini busy hai, thoda baad try karo");
      return;
    }
    response = response.trim();
    responseText = responseText.replace(/^```json\s*|```$/g, "").trim();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (err) {
      console.log(" Gemini ne valid JSON nahi diya");
      return;
    }

    if (data.weather_details_needed === false) {
      console.log(data.weather_report);
      return;
    }

    const weatherInformation = await getWheather(data.location);
    const weatherInfo = JSON.stringify(weatherInformation);

    ConversationHistory.push({
      role: "user",
      parts: [{ text: weatherInfo }]
    });
  }

  console.log(" Agent loop limit reached");
}

chatting();

// 4 Api use karana hai 
// first agent: mausam ke baare me btayega
// Blockchain 
// Github profile leke aayega 
// News current new btayega 