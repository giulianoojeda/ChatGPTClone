// Import React hooks for managing state and side effects
import { useState, useEffect } from "react";

// Define the main component for the ChatGPT interface
const App = () => {
  // Declare state variables for managing the user's input, the API's response, the chat history, and the current chat title

  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  // Function for creating a new chat
  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  };
  // Function for handling click events on chat titles in the sidebar
  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  };
  // Function for sending the user's message to the OpenAI API and updating the state with the API's response
  const getMessages = async () => {
    // Construct the options object for the API request
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      // Send the request to the OpenAI API and await the response
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      // Update the state with the response data
      setMessage(data.choices[0].message);
    } catch (error) {
      // Log any errors that occur during the request
      console.error(error);
    }
  };

  // Use the useEffect hook to update the chat history when the message and currentTitle state variables change
  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle]);
  // Filter the chat history to only show messages for the current chat title
  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  );
  // Get a list of unique chat titles to display in the sidebar
  const uniqueTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );
  // Render the component's UI
  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li key={index} onClick={() => handleClick(uniqueTitle)}>
              {uniqueTitle}
            </li>
          ))}
        </ul>
        <nav>
          <p>Made by Gio</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>ChatGPT Clone</h1>}
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => (
            <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input
              placeholder="Send a message..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div id="submit" onClick={getMessages}>
              ➢
            </div>
          </div>
          <p className="info">
            ChatGPT Mar 23 Version. ChatGPT may produce inaccurate information
            about people, places, or facts.
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
