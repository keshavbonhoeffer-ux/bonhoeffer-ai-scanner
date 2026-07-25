"use client";

import { useState } from "react";
import Robot3D from "../components/bon-ai/Robot3D";
import ChatWindow from "../components/bon-ai/ChatWindow";

export default function BonAI() {
  const [messages, setMessages] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#f4f7f9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "280px",
          background: "#0B6E4F",
          color: "white",
          padding: "25px",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ marginTop: 0 }}>🤖 BON AI</h2>

        <hr
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            margin: "20px 0",
          }}
        />

        <p>🏠 Dashboard</p>
        <p>📦 Product Assistant</p>
        <p>👤 Lead Assistant</p>
        <p>💼 Opportunity Assistant</p>
        <p>📈 Business This Month</p>
        <p>🕘 Customer History</p>
      </div>

      {/* Main */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#fff",
            padding: "20px 30px",
            borderBottom: "1px solid #ddd",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Welcome to BON AI
        </div>

        {/* Dashboard */}
        <div
          style={{
            flex: 1,
            padding: "30px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              background: "#fff",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h2>👋 Hello, Keshav!</h2>

            <p>
              I am <strong>BON AI</strong>, your Enterprise AI Assistant.
            </p>

            <ul style={{ lineHeight: "2" }}>
              <li>📦 Product Information</li>
              <li>👤 Lead Management</li>
              <li>💼 Opportunity Assistance</li>
              <li>📈 Business Performance</li>
              <li>🕘 Customer History</li>
              <li>🤖 AI Powered Answers</li>
            </ul>
          </div>
        </div>

        {/* Bottom Input */}
        <div
          style={{
            padding: "20px",
            background: "#fff",
            borderTop: "1px solid #ddd",
          }}
        >
          <input
            type="text"
            placeholder="Ask BON AI anything..."
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* ========================= */}
        {/* Floating 3D Robot */}
        {/* ========================= */}

        <div
          style={{
            position: "fixed",

            // Move robot much further right
            right: "-90px",

            // Lower slightly
            bottom: "-20px",

            width: "420px",
            height: "420px",

            zIndex: 9999,

            // Container ignores clicks
            pointerEvents: "none",
          }}
        >
          <div
            onClick={() => setChatOpen(!chatOpen)}
            style={{
              width: "100%",
              height: "100%",

              cursor: "pointer",

              // Only robot receives clicks
              pointerEvents: "auto",

              transition: "all .3s ease",

              transform: chatOpen
                ? "scale(1.08)"
                : "scale(1)",

              transformOrigin: "bottom right",
            }}
          >
            <Robot3D />
          </div>
        </div>

        {/* Chat Window */}

        <ChatWindow
          open={chatOpen}
          onClose={() => setChatOpen(false)}
        />
      </div>
    </div>
  );
}