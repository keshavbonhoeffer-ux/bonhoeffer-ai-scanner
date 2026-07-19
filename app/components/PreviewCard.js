"use client";

export default function PreviewCard({
  image,
  fileName,
  onAnalyze,
  onChangeImage,
}) {
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
          width: "520px",
          background: "#fff",
          borderRadius: "20px",
          padding: "35px",
          textAlign: "center",
          boxShadow: "0 10px 35px rgba(0,0,0,.15)",
        }}
      >
        <h2
          style={{
            color: "#0B8F3C",
            fontSize: "34px",
            marginBottom: "25px",
          }}
        >
          📷 Business Card Preview
        </h2>

        <img
          src={image}
          alt="Business Card"
          style={{
            width: "100%",
            maxHeight: "320px",
            objectFit: "contain",
            borderRadius: "12px",
            border: "2px solid #ddd",
          }}
        />

        <p
          style={{
            marginTop: "15px",
            color: "#555",
            fontWeight: "bold",
          }}
        >
          {fileName}
        </p>

        <button
          onClick={onAnalyze}
          style={{
            marginTop: "25px",
            width: "100%",
            padding: "18px",
            background: "#0B8F3C",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🤖 Analyze Business Card
        </button>

        <button
          onClick={onChangeImage}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "16px",
            background: "#ffffff",
            color: "#0B8F3C",
            border: "2px solid #0B8F3C",
            borderRadius: "12px",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🔄 Choose Another Image
        </button>
      </div>
    </main>
  );
}