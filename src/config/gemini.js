import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Import the API key from the environment file
const apiKey = import.meta.env.VITE_API_KEY;

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp", // Specify the model
});

const generationConfig = {
  temperature: 1, // Control creativity (higher = more creative)
  topP: 0.95,     // Probability-based token sampling
  topK: 40,       // Limit to top-K probable tokens
  maxOutputTokens: 8192, // Maximum tokens in output
  responseMimeType: "text/plain", // Expected response format
};

// Function to handle chat generation
async function runChat(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [], // Provide chat history if needed
    });

    const result = await chatSession.sendMessage(prompt); // Pass the prompt dynamically
    console.log(result.response.text()); // Log the response
    return result.response.text(); // Return the response for further use
  } catch (error) {
    console.error("Error running chat:", error); // Handle errors gracefully
    throw error;
  }
}

export default runChat;

