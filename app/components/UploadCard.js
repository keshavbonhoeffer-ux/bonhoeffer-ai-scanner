"use client";

export default function UploadCard({ onCameraClick, onGalleryClick }) {
  return (
    <div
      style={{
        width: "430px",
        background: "#fff",
        borderRadius: "18px",
        padding: "45px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,.15)",
        borderTop: "8px solid #0B8F3C",
      }}
    >
      <h1
        style={{
          color: "#0B8F3C",
          fontSize: "48px",
        }}
      >
        Bonhoeffer AI Scanner
      </h1>

      <p
        style={{
          fontSize: "20px",
          color: "#555",
          lineHeight: "34px",
        }}
      >
        Scan a business card and automatically create a Lead in Salesforce using AI.
      </p>

      {/* Camera Button */}
      <button
        onClick={onCameraClick}
        style={{
          width: "100%",
          padding: "18px",
          fontSize: "22px",
          background: "#0B8F3C",
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: "bold",
          marginTop: "25px",
        }}
      >
        📷 Capture Business Card
      </button>

      <div
        style={{
          margin: "18px 0",
          color: "#777",
          fontWeight: "bold",
        }}
      >
        OR
      </div>

      {/* Gallery Button */}
      <button
        onClick={onGalleryClick}
        style={{
          width: "100%",
          padding: "18px",
          fontSize: "22px",
          background: "#ffffff",
          color: "#0B8F3C",
          border: "2px solid #0B8F3C",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🖼️ Upload Business Card
      </button>

      <p
        style={{
          marginTop: "30px",
          color: "#777",
        }}
      >
        Powered by Gemini AI • Bonhoeffer Machines Pvt. Ltd.
      </p>
    </div>
  );
}