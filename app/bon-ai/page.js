"use client";

import { useState } from "react";
import Image from "next/image";
import ChatWindow from "../components/bon-ai/ChatWindow";

export default function BonAI() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#F5F7FA",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* ========================= */}
      {/* Sidebar */}
      {/* ========================= */}

      <div
        style={{
          width: "280px",
          background: "#0F5D47",
          color: "#fff",
          padding: "25px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <Image
            src="/images/bonhoeffer_logo.png"
            alt="Bonhoeffer Machines"
            width={180}
            height={80}
          />
        </div>

        <hr
          style={{
            border: "1px solid rgba(255,255,255,.15)",
            marginBottom: "25px",
          }}
        />

        <div style={{ lineHeight: "45px", fontSize: "16px" }}>
          <div>🏠 Dashboard</div>
          <div>📦 Product Information</div>
          <div>👤 Lead Assistant</div>
          <div>💼 Opportunity Assistant</div>
          <div>📊 Business Analytics</div>
          <div>🕘 Customer History</div>
        </div>
      </div>

      {/* ========================= */}
      {/* Main Area */}
      {/* ========================= */}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}

        <div
          style={{
            background: "#ffffff",
            padding: "22px 35px",
            borderBottom: "1px solid #E5E7EB",
            fontSize: "28px",
            fontWeight: "bold",
            color: "#0F5D47",
          }}
        >
          Salesforce AI Assistant
        </div>

        {/* Content */}

        <div
          style={{
            flex: 1,
            overflow: "auto",
            padding: "40px",
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              background: "#ffffff",
              borderRadius: "18px",
              padding: "45px",
              boxShadow: "0 8px 25px rgba(0,0,0,.08)",
            }}
          >
            <div
              style={{
                textAlign: "center",
              }}
            >
              <Image
                src="/images/bonhoeffer_logo.png"
                alt="Bonhoeffer Machines"
                width={220}
                height={90}
              />

              <h1
                style={{
                  marginTop: "25px",
                  color: "#0F5D47",
                  fontSize: "38px",
                }}
              >
                Salesforce AI Assistant
              </h1>

              <p
                style={{
                  fontSize: "18px",
                  color: "#666",
                  marginTop: "10px",
                }}
              >
                Your Intelligent Salesforce Business Assistant
              </p>
            </div>

            <hr
              style={{
                margin: "40px 0",
                border: "1px solid #ECECEC",
              }}
            />

            <h2
              style={{
                color: "#0F5D47",
                marginBottom: "20px",
              }}
            >
              What can Salesforce AI Assistant do?
            </h2>

            <p
              style={{
                fontSize: "17px",
                color: "#555",
                lineHeight: "32px",
              }}
            >
              Salesfoce AI Assistant helps employees quickly access Salesforce
              business information, analyze sales performance, retrieve customer
              history, manage opportunities, and answer product-related
              questions using AI.
            </p>

            <div
              style={{
                marginTop: "35px",
                lineHeight: "40px",
                fontSize: "17px",
              }}
            >
              ✅ Product Information
              <br />
              ✅ Lead Management
              <br />
              ✅ Opportunity Assistance
              <br />
              ✅ Sales Performance
              <br />
              ✅ Business Analytics
              <br />
              ✅ Customer History
              <br />
              ✅ AI Powered Business Answers
            </div>
          </div>
        </div>

        {/* Footer */}

        <div
          style={{
            background: "#ffffff",
            borderTop: "1px solid #E5E7EB",
            padding: "18px",
            textAlign: "center",
            color: "#666",
            fontSize: "15px",
          }}
        >
          Click the AI Assistant icon to start a conversation.
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