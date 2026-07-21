"use client";

export default function LoadingCard() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
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
        {/* Animated Bonhoeffer Logo */}

        <img
          src="https://bonhoeffermachines.com/en/public/images/bonhoeffer_logo.png"
          alt="Bonhoeffer Machines"
          style={{
            width: "230px",
            marginBottom: "30px",
            animation: "pulse 1.8s ease-in-out infinite",
          }}
        />

        <h1
          style={{
            color: "#0B8F3C",
            fontSize: "34px",
            marginBottom: "15px",
          }}
        >
          AI is Analyzing...
        </h1>

        <p
          style={{
            color: "#555",
            fontSize: "18px",
            lineHeight: "34px",
            marginBottom: "25px",
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

        <div
          style={{
            width: "100%",
            height: "8px",
            background: "#E4F2E8",
            borderRadius: "999px",
            overflow: "hidden",
            margin: "30px 0",
          }}
        >
          <div
            style={{
              width: "35%",
              height: "100%",
              background: "#0B8F3C",
              borderRadius: "999px",
              animation: "loading 1.5s ease-in-out infinite",
            }}
          />
        </div>

        <p
          style={{
            color: "#777",
            fontSize: "15px",
            lineHeight: "24px",
          }}
        >
          Please wait...
          <br />
          This usually takes only a few seconds.
        </p>

        <hr
          style={{
            margin: "35px 0 20px",
            border: "none",
            borderTop: "1px solid #ddd",
          }}
        />

        <div
          style={{
            color: "#666",
            fontSize: "14px",
            lineHeight: "24px",
          }}
        >
          <strong>Bonhoeffer Machines Pvt. Ltd.</strong>
          <br />
          Powered by Google Gemini AI
        </div>

        <style>{`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: .85;
            }
            50% {
              transform: scale(1.05);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: .85;
            }
          }

          @keyframes loading {
            0% {
              transform: translateX(-120%);
            }
            100% {
              transform: translateX(350%);
            }
          }
        `}</style>
      </div>
    </main>
  );
}