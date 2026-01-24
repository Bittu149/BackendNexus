require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");
const readlineSync = require('readline-sync');

// node-fetch fix (same style)
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

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

const userName = readlineSync.question('May I have your name? ');
console.log('Hi ' + userName + '!');

module.exports = {
  main,
  getWheather
};
