"use client";

import { useState } from "react";

export default function ChatWindow({ open, onClose }) {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "🚨 THIS IS THE NEW CHATWINDOW FILE 🚨",
    },
  ]);

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function sendMessage() {
    if (!input.trim()) return;

    const question = input;

    // Save current chat including the user's new message
    const updatedMessages = [
      ...messages,
      {
        sender: "user",
        text: question,
      },
    ];

    setMessages(updatedMessages);

    setInput("");
    setLoading(true);

    try {
      const accessToken = sessionStorage.getItem("sf_access_token");
const instanceUrl = sessionStorage.getItem("sf_instance_url");
console.log("Access Token:", accessToken);
console.log("Instance URL:", instanceUrl);

const response = await fetch("/api/bon-ai", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({
    message: question,
    history: updatedMessages,
    accessToken,
    instanceUrl,
  }),
});

      const data = await response.json();

      if (data.compare) {
        let compareText = `📊 PRODUCT COMPARISON\n\n`;

        compareText += `${data.model1} VS ${data.model2}\n\n`;

        data.comparison.forEach((item) => {
          compareText += `${item.specification}\n`;
          compareText += `• ${data.model1}: ${item.product1}\n`;
          compareText += `• ${data.model2}: ${item.product2}\n\n`;
        });

        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: compareText,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: data.reply || "No response received.",
          },
        ]);
      }
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Failed to contact BON AI.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    
    <div
      style={{
        position: "fixed",
        right: "260px",
        bottom: "25px",
        width: "420px",
        height: "620px",
        background: "#fff",
        borderRadius: "22px",
        boxShadow: "0 20px 60px rgba(0,0,0,.20)",
        overflow: "hidden",
        zIndex: 9998,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
  style={{
    background: "#0B6E4F",
    color: "#fff",
    padding: "18px 22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "18px",
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }}
  >
    <span>🤖 BON AI - LOGIN TEST</span>

    <button
      onClick={() => {
        window.location.href = "/api/auth/login?source=bonai";
      }}
      style={{
        background: "#ffffff",
        color: "#0B6E4F",
        border: "none",
        borderRadius: "8px",
        padding: "6px 10px",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "bold",
      }}
    >
      Login
    </button>
  </div>

  <button
    onClick={onClose}
    style={{
      background: "transparent",
      border: "none",
      color: "#fff",
      fontSize: "24px",
      cursor: "pointer",
    }}
  >
    ×
  </button>
</div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          background: "#F7F9FB",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              background: msg.sender === "user" ? "#0B6E4F" : "#fff",
              color: msg.sender === "user" ? "#fff" : "#000",
              padding: "14px",
              borderRadius: "16px",
              maxWidth: "80%",
              whiteSpace: "pre-wrap",
              boxShadow: "0 4px 15px rgba(0,0,0,.08)",
            }}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div
            style={{
              background: "#fff",
              padding: "14px",
              borderRadius: "16px",
              width: "fit-content",
              boxShadow: "0 4px 15px rgba(0,0,0,.08)",
            }}
          >
            🤖 BON AI is typing...
          </div>
        )}
      </div>

      <div
        style={{
          padding: "15px",
          borderTop: "1px solid #E5E5E5",
          display: "flex",
          gap: "10px",
          background: "#fff",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Ask BON AI..."
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #DDD",
            outline: "none",
            fontSize: "15px",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            width: "52px",
            border: "none",
            borderRadius: "12px",
            background: "#0B6E4F",
            color: "#fff",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}