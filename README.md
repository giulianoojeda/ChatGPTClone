# ChatGPT Clone

This is a ChatGPT interface clone built using React and Node.js, designed to demonstrate how to integrate the OpenAI Chat API in a web application.

## Requirements

Before you can run this application, you must have the following software installed:

- [Node.js](https://nodejs.org/en/) (version 18.0 or later)
- [React](https://reactjs.org/docs/getting-started.html) (version 18.0 or later)

Please refer to the following links for installation instructions:

- [Installing Node.js](https://nodejs.org/en/download/)
- [Getting Started with React](https://reactjs.org/docs/getting-started.html)

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the dependencies by running the following command:

   ```
   npm install
   ```

4. Copy the `.env.example` file to `.env` by running the following command:

   ```
   cp .env.example .env
   ```

   This will create a new `.env` file with the same variables as the example file, but without the values. You should replace the values with your own API key and port number.

   ```
    # OpenAI API key
    API_KEY = your-openai-api-key-here

    # Port number for the Node.js server
    PORT = 8000
   ``` 

   Replace `<your-openai-api-key-here>` with your actual OpenAI API key, and update the port number if needed.

5. Start the server and the client by running the following command:

   ```
   npm run start:backend
   ```

   This will start the Node.js server using `nodemon` and listen for incoming connections.

   In a separate terminal window, run the following command:

   ```
   npm run start:frontend
   ```

   This will start the React development server on `PORT 3000` and open the application in your default web browser. If you need to use a different port for the React development server, make sure to update the `start:frontend` script in the `package.json` file.

   ```
   "scripts": {
     "start:frontend": "PORT=3001 react-scripts start",
     "start:backend": "nodemon server.js"
   }
   ```

6. Navigate to `http://localhost:3000` in your web browser to access the ChatGPT interface.

## Usage

The ChatGPT interface is a simple chatbot that uses the OpenAI chat API to generate responses to user inputs. To use the interface, simply type your message in the input field and press "Enter" or click the "Send" button. The chatbot will respond with a generated message based on your input.

## Credits

This project was created by Giuliano Ojeda. It uses the [OpenAI chat API](https://platform.openai.com/docs/api-reference/chat/create) for generating responses.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).