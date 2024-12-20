import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import React from "react";
const socket = io("http://localhost:3000");

const App = () => {
  // state

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  // Action
  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    // Why Clean up?
    return () => {
      socket.off("message");
    };
  }, [messages]);

  return (
    <div>
      <h1>Simple Chat app</h1>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Write the message..."
        />
        <button type="submit">Send</button>
      </form>
      <section>
        {messages.map((message, index) => {
          return (
            <div key={index}>
              <p>{message}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default App;
