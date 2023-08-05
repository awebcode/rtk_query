import React, { createContext, useState } from "react";

// Create the context
const MessageContext = createContext();

// Create the provider component
const MessageProvider = ({ children }) => {
  // State to hold the message
  const [message, setMessage] = useState("");

  // Function to update the message
  const setMessageHandler = (newMessage) => {
    setMessage(newMessage);
  };

  return (
    <MessageContext.Provider value={{ message, setMessage: setMessageHandler }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };
