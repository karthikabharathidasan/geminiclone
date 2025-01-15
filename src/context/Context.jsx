import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState(""); // Store the recent prompt
  const [prevPrompts, setPrevPrompts] = useState([]); // Store all the previous prompts
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {
    setResultData(""); // Clear previous result
    setLoading(true); // Show loading spinner
    setShowResult(true); // Show result section

    // Use the prompt if it's provided, otherwise fall back to input
    const userPrompt = prompt || input;

    // Check if the prompt is already in the recentPrompt
    if (userPrompt === recentPrompt) {
      setLoading(false);
      return; // Don't send the request again if it's the same as the recent prompt
    }

    // Add the recent prompt to the prevPrompts array
    setPrevPrompts((prev) => [userPrompt, ...prev]);
    setRecentPrompt(userPrompt); // Update the recent prompt state

    try {
      // Fetch the response from runChat
      const response = await runChat(userPrompt);

      let responseArray = response.split("**");
      let newArray = ""; // Initialize newArray as an empty string

      // Format the response with <b> tags
      for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 !== 1) {
          newArray += responseArray[i]; // Add the part without the <b> tag
        } else {
          newArray += "<b>" + responseArray[i] + "</b>"; // Add the part with the <b> tag
        }
      }

      // Replace '*' with line breaks
      let formattedResponse = newArray.replace(/\*/g, "</br>");

      setResultData(formattedResponse); // Set the formatted response immediately
    } catch (error) {
      console.error("Error during chat:", error);
      setResultData("There was an error processing your request.");
    }

    setLoading(false); // Hide the loading spinner
    setInput(""); // Clear input field
  };

  const contextValue = {
    prevPrompts, // Expose prevPrompts for access in components like Sidebar
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt, // Expose recentPrompt for access in components
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
