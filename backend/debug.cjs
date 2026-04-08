const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash', generationConfig: { responseMimeType: 'application/json' } });

async function test() {
  try {
    const prompt = `You are a topic validator for an educational platform. The user typed: "react".
    If the input is gibberish, a random keyboard smash, nonsensical, or inappropriate, return an empty array.
    Otherwise, return a JSON object with a single key "topics" mapping to an array of up to 5 valid, formal, academic or specific study topics closely related to the input.
    If the input is already a valid topic, include the beautifully capitalized version of it as the first element.`;
    
    const result = await model.generateContent(prompt);
    console.log("Raw Response:\n", result.response.text());
  } catch(e) {
    console.error("Error:", e);
  }
}
test();
