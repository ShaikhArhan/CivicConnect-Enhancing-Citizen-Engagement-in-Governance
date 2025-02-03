import React, { useState } from 'react'
import "../CivicBot.css"
import chatIcon from "./image/chat-icon.png";
export const CivicBot = () => {
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]); // Array to store chat messages
    const [inputMessage, setInputMessage] = useState(""); // Store the current input message

    // Toggle chat open/close
    const toggleChat = () => {
        setChatOpen(!chatOpen);
    };

    // Handle sending a new message
    const sendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            // Add user message
            const newMessage = { text: inputMessage, sender: "user" };
            setMessages([...messages, newMessage]);

            // Clear the input field
            setInputMessage("");

            // Add bot response after a short delay
            setTimeout(() => {
                const botMessage = {
                    text: `You said: ${inputMessage}`, // Simple bot response
                    sender: "bot",
                };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }, 500); // Simulating bot typing delay
        }
    };

    return (
        < >
            {/* Button with chat icon in bottom-right corner */}
            <button className="chatbot-button" onClick={toggleChat} style={{ zIndex: "999" }}>
                <img src={chatIcon} alt="Chat" className="chat-icon" />
            </button>

            {/* Conditionally render the chatbot UI */}
            {chatOpen && (
                <div className="chatbox" style={{ zIndex: "999" }}>
                    <h3>Chatbot</h3>
                    <div className="chatbox-messages">
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`chat-message ${msg.sender === "user" ? "user-message" : "bot-message"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))
                        ) : (
                            <p>No messages yet!</p>
                        )}
                    </div>

                    {/* Input form for new messages */}
                    <form className="chatbox-form" onSubmit={sendMessage}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="chatbox-input"
                        />
                        <button type="submit" className="chatbox-send">
                            Send
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}
