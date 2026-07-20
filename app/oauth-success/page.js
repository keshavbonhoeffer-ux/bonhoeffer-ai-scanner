"use client";

import { useEffect, useState } from "react";

export default function OAuthSuccess() {
  const [message, setMessage] = useState("Connecting to Salesforce...");

  useEffect(() => {
    async function createLead() {
      try {
        // Read token from URL
        const params = new URLSearchParams(window.location.search);

        const accessToken = params.get("accessToken");
        const instanceUrl = params.get("instanceUrl");

        if (accessToken && instanceUrl) {
          sessionStorage.setItem("sf_access_token", accessToken);
          sessionStorage.setItem("sf_instance_url", instanceUrl);
        }

        const sfAccessToken = sessionStorage.getItem("sf_access_token");
        const sfInstanceUrl = sessionStorage.getItem("sf_instance_url");

        const leadData = JSON.parse(localStorage.getItem("leadData"));

        if (!sfAccessToken || !sfInstanceUrl || !leadData) {
          setMessage("❌ Missing Salesforce session.");
          return;
        }

        setMessage("Creating Lead in Salesforce...");

        const response = await fetch("/api/salesforce/createLead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken: sfAccessToken,
            instanceUrl: sfInstanceUrl,
            ...leadData,
          }),
        });

        const result = await response.json();

        console.log("========== FULL RESPONSE ==========");
        console.log(result);
        console.log("===================================");

        if (result.success) {
          setMessage("✅ Lead Created Successfully!");
        } else {
          alert(JSON.stringify(result, null, 2));
          setMessage("❌ Failed to Create Lead.");
        }
      } catch (error) {
        console.error(error);
        alert(error.toString());
        setMessage("❌ Unexpected Error");
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
        background: "#eef7ef",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,.15)",
          textAlign: "center",
          width: "500px",
        }}
      >
        <h2
          style={{
            color: "#0B8F3C",
            marginBottom: "20px",
          }}
        >
          Bonhoeffer AI Scanner
        </h2>

        <h3>{message}</h3>
      </div>
    </main>
  );
}