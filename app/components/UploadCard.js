"use client";

export default function UploadCard({ onCameraClick, onGalleryClick }) {
  return (
    <div
      style={{
        width: "470px",
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "24px",
        padding: "45px",
        textAlign: "center",
        boxShadow: "0 20px 50px rgba(0,0,0,.18)",
        borderTop: "8px solid #0B8F3C",
      }}
    >
      {/* Logo */}

      <img
        src="https://bonhoeffermachines.com/en/public/images/bonhoeffer_logo.png"
        alt="Bonhoeffer"
        style={{
          width: "220px",
          marginBottom: "25px",
        }}
      />

      <h1
        style={{
          color: "#0B8F3C",
          fontSize: "34px",
          marginBottom: "10px",
        }}
      >
        AI Business Card Scanner
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#555",
          lineHeight: "30px",
          marginBottom: "35px",
        }}
      >
        Capture business cards and automatically create Salesforce Leads using
        Google Gemini AI.
      </p>

      {/* Camera Button */}

      <button
        onClick={onCameraClick}
        style={{
          width: "100%",
          padding: "18px",
          fontSize: "21px",
          background: "#0B8F3C",
          color: "#fff",
          border: "none",
          borderRadius: "14px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: ".25s",
        }}
      >
        📷 Scan Business Card
      </button>

      <div
        style={{
          margin: "22px 0",
          color: "#888",
          fontWeight: "bold",
          letterSpacing: "2px",
        }}
      >
        OR
      </div>

      <button
        onClick={onGalleryClick}
        style={{
          width: "100%",
          padding: "18px",
          fontSize: "21px",
          background: "#fff",
          color: "#0B8F3C",
          border: "2px solid #0B8F3C",
          borderRadius: "14px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🖼 Upload Business Card
      </button>

      <hr
        style={{
          margin: "35px 0 20px",
          border: 0,
          borderTop: "1px solid #ddd",
        }}
      />

      <div
        style={{
          fontSize: "14px",
          color: "#666",
          lineHeight: "24px",
        }}
      >
        <strong>Bonhoeffer Machines Pvt. Ltd.</strong>

        <br />

        Powered by Google Gemini AI
      </div>
    </div>
  );
}