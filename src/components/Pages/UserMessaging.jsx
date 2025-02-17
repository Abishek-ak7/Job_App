import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Picker } from "emoji-mart"; // For emojis (optional - install emoji-mart for this to work)

const UserMessaging = () => {
  const { employeeId } = useParams(); // Dynamic recipient ID
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [file, setFile] = useState(null); // To manage file uploads
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const sendMessage = () => {
    if (!messageInput.trim() && !file) return; // Prevent sending empty messages

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "You", content: messageInput, file: file, timestamp: new Date() },
    ]);
    setMessageInput("");
    setFile(null);
    setIsTyping(false);
  };

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
    setIsTyping(e.target.value.trim().length > 0);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessageInput(messageInput + emoji.native); // Add emoji to message input
    setShowEmojiPicker(false); // Hide emoji picker after selection
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-4"
      style={{
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/dark-mosaic.png'), linear-gradient(to right, #2c3e50, #3498db)",
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
      }}
    >
      <h1 className="text-2xl font-bold mb-6 text-white shadow-lg">
        Chat with Employee ID: {employeeId}
      </h1>
      <div className="w-full max-w-2xl bg-white/10 rounded-lg shadow-xl p-4 flex flex-col backdrop-blur-lg">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">No messages yet</p>
          ) : (
            <ul className="space-y-4">
              {messages.map((msg, index) => (
                <li
                  key={index}
                  className={`flex ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      msg.sender === "You"
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-300 text-black"
                    } p-4 rounded-lg max-w-lg shadow-md transform transition-transform duration-500 ${
                      msg.sender === "You" ? "hover:scale-105" : ""
                    }`}
                  >
                    <p className="break-words">{msg.content}</p>
                    {msg.file && (
                      <div className="mt-2">
                        <a
                          href={URL.createObjectURL(msg.file)}
                          className="text-indigo-400"
                          download
                        >
                          Download File
                        </a>
                      </div>
                    )}
                    <small className="block text-xs text-gray-200 mt-1">
                      {msg.timestamp.toLocaleTimeString()}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Typing Indicator */}
        {isTyping && (
          <p className="text-sm text-gray-500 mb-2 animate-pulse">
            You are typing...
          </p>
        )}

        {/* Input Box */}
        <div className="flex space-x-2 mt-4">
          <input
            type="text"
            value={messageInput}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-lg transition-transform duration-300"
          />

          {/* Emoji Button */}
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-xl text-yellow-400 p-3 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 rounded-xl transition-transform duration-300 shadow-lg"
          >
            😊
          </button>

          {/* File Upload */}
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="bg-green-500 text-white p-3 rounded-xl cursor-pointer hover:bg-green-600 transition-transform duration-300"
          >
            📎
          </label>

          {/* Send Button */}
          <button
            onClick={sendMessage}
            className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 focus:ring-2 focus:ring-green-500 transition-transform duration-300 shadow-lg"
          >
            Send
          </button>
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-16">
            <Picker onSelect={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMessaging;
