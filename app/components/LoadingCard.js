"use client";

export default function LoadingCard() {
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
          width: "500px",
          background: "white",
          padding: "45px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow: "0 12px 30px rgba(0,0,0,.15)",
        }}
      >
        <div
          style={{
            fontSize: "70px",
            animation: "spin 2s linear infinite",
          }}
        >
            🤖
        </div>

        <h1
          style={{
            color: "#0B8F3C",
            marginTop: "20px",
          }}
        >
          AI is Analyzing...
        </h1>

        <p
          style={{
            color: "#555",
            fontSize: "18px",
            marginTop: "15px",
            lineHeight: "30px",
          }}
        >
          Reading Business Card...
          <br />
          Detecting Text...
          <br />
          Extracting Contact Details...
          <br />
          Preparing Salesforce Lead...
        </p>

        <style>{`
            @keyframes spin{
              from{transform:rotate(0deg);}
              to{transform:rotate(360deg);}
            }
        `}</style>
      </div>
    </main>
  );
}