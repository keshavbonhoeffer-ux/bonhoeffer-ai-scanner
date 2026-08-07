"use client";

import { useState } from "react";
import Image from "next/image";

export default function ChatWindow({ open, onClose }) {

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "👋 Welcome to Salesforce AI Assistant.\n\nHow can I help you today?",
    },
  ]);

  if (!open) return null;

  async function sendMessage() {

    if (!input.trim()) return;

    const question = input.trim();

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

      const accessToken =
        sessionStorage.getItem("sf_access_token");

      const instanceUrl =
        sessionStorage.getItem("sf_instance_url");

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

        let compareText =
          `📊 PRODUCT COMPARISON\n\n`;

        compareText +=
          `${data.model1} VS ${data.model2}\n\n`;

        data.comparison.forEach((item) => {

          compareText +=
            `${item.specification}\n`;

          compareText +=
            `• ${data.model1}: ${item.product1}\n`;

          compareText +=
            `• ${data.model2}: ${item.product2}\n\n`;

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
            text:
              data.reply ||
              "No response received.",
          },
        ]);

      }

    } catch (error) {

      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "❌ Unable to contact Salesforce AI Assistant.",
        },
      ]);

    }

    setLoading(false);

  }

  return (

    <div
      style={{
        position: "fixed",
        right: "25px",
        bottom: "25px",
        width: "500px",
        height: "700px",
        background: "#FFFFFF",
        borderRadius: "20px",
        boxShadow: "0 20px 60px rgba(0,0,0,.18)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        zIndex: 9999,
      }}
    >
            {/* ================= HEADER ================= */}

      <div
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Image
            src="/images/bonhoeffer_logo.png"
            alt="Bonhoeffer"
            width={48}
            height={48}
          />

          <div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#0B6E4F",
              }}
            >
              Salesforce AI Assistant
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#777",
              }}
            >
              Bonhoeffer Machines Pvt. Ltd.
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={() => {
              window.location.href =
                "/api/auth/login?source=bonai";
            }}
            style={{
              background: "#0B6E4F",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              padding: "8px 14px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Login
          </button>

          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "26px",
              color: "#777",
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* ================= CHAT AREA ================= */}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px",
          background: "#F7F8FA",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
    
      {messages.map((msg, index) => (

  <div
    key={index}
    style={{
      display: "flex",
      justifyContent:
        msg.sender === "user"
          ? "flex-end"
          : "flex-start",
    }}
  >

    <div
      style={{
        maxWidth: "82%",
        background:
          msg.sender === "user"
            ? "#0B6E4F"
            : "#FFFFFF",

        color:
          msg.sender === "user"
            ? "#FFFFFF"
            : "#222",

        padding: "10px 14px",

        borderRadius:
          msg.sender === "user"
            ? "18px 18px 4px 18px"
            : "18px 18px 18px 4px",

        boxShadow:
          "0 4px 12px rgba(0,0,0,.08)",

        whiteSpace: "pre-wrap",

        fontSize: "14px",

        lineHeight: "20px",
      }}
    >

      {msg.sender === "ai" && (

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "10px",
            fontWeight: "700",
            color: "#0B6E4F",
          }}
        >

          <Image
            src="/images/bonhoeffer_logo.png"
            alt="AI"
            width={24}
            height={24}
          />

          Salesforce AI Assistant

        </div>

      )}

      {msg.text}

    </div>

  </div>

))}

{loading && (

  <div
    style={{
      display: "flex",
      justifyContent: "flex-start",
    }}
  >

    <div
      style={{
        background: "#FFFFFF",
        padding: "14px 18px",
        borderRadius: "18px",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
        color: "#666",
        fontSize: "15px",
      }}
    >
      🤖 Salesforce AI Assistant is typing...
    </div>

  </div>

)}

      </div>

      {/* ================= INPUT ================= */}

      <div
        style={{
          background: "#FFFFFF",
          borderTop: "1px solid #E5E7EB",
          padding: "16px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      ></div>
              <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Ask Salesforce AI Assistant..."
          style={{
            flex: 1,
            padding: "10px 14px",
            border: "1px solid #D1D5DB",
            borderRadius: "12px",
            outline: "none",
            fontSize: "14px",
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            background: loading ? "#9CA3AF" : "#0B6E4F",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "12px",
            padding: "10px 18px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "600",
            fontSize: "15px",
            minWidth: "70px",
          }}
        >
          {loading ? "..." : "Send"}
</button>

</div>

);
}