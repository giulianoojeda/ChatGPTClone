// Load environment variables from the .env file
require("dotenv").config();

// Import the required packages
const express = require("express");
const cors = require("cors");

// Create a new instance of the Express application
const app = express();

// Set up middleware to parse incoming JSON data and enable CORS
app.use(express.json());
app.use(cors());

// Set the port number for the server, using the PORT environment variable if available
const PORT = process.env.PORT || 8000;

// Set the API key for the OpenAI API, using the API_KEY environment variable
const API_KEY = process.env.API_KEY;

// Define a route for handling POST requests to the /completions endpoint
app.post("/completions", async (req, res) => {
  // Construct the options object for the OpenAI API request
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }],
      max_tokens: 100,
    }),
  };

  try {
    // Send the request to the OpenAI API and await the response
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();

    // Send the response data back to the client
    res.send(data);
  } catch (error) {
    // Log any errors that occur during the request
    console.error(error);
  }
});

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () =>
  console.log("Your server is running on PORT " + PORT)
);
