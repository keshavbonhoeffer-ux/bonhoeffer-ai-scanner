"use client";

import { useEffect, useState } from "react";

export default function OAuthSuccess() {
  const [message, setMessage] = useState("Creating Lead...");

  useEffect(() => {
    async function createLead() {
      try {
        const accessToken = sessionStorage.getItem("sf_access_token");
        const instanceUrl = sessionStorage.getItem("sf_instance_url");
        const leadData = JSON.parse(localStorage.getItem("leadData"));

        if (!accessToken || !instanceUrl || !leadData) {
          setMessage("Missing Salesforce session.");
          return;
        }

        const response = await fetch("/api/salesforce/createLead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken,
            instanceUrl,
            ...leadData,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setMessage("✅ Lead Created Successfully!");
        } else {
          console.log(data);
          setMessage("❌ Failed to create Lead.");
        }
      } catch (e) {
        console.error(e);
        setMessage("Unexpected Error");
      }
    }

    createLead();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        background: "#eef7ef",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,.15)",
          textAlign: "center",
        }}
      >
        <h2>{message}</h2>
      </div>
    </main>
  );
}