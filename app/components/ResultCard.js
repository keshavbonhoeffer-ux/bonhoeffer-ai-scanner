"use client";

export default function ResultCard({ data }) {
  const handleCreateLead = () => {
    // Save extracted lead data
    localStorage.setItem("leadData", JSON.stringify(data));

    // Redirect to our PKCE login route
    window.location.href = "/api/auth/login";
  };

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
          width: "550px",
          background: "#fff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 12px 30px rgba(0,0,0,.15)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#0B8F3C",
            color: "white",
            fontSize: "42px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          👤
        </div>

        <h2
          style={{
            color: "#0B8F3C",
            marginTop: "20px",
          }}
        >
          AI Successfully Extracted
        </h2>

        <div
          style={{
            marginTop: "30px",
            textAlign: "left",
            lineHeight: "35px",
            fontSize: "18px",
          }}
        >
          <strong>Name:</strong> {data?.name}
          <br />

          <strong>Company:</strong> {data?.company}
          <br />

          <strong>Email:</strong> {data?.email}
          <br />

          <strong>Phone:</strong> {data?.phone}
          <br />

          <strong>Designation:</strong> {data?.designation}
        </div>

        <button
          onClick={handleCreateLead}
          style={{
            marginTop: "35px",
            width: "100%",
            padding: "16px",
            border: "none",
            borderRadius: "10px",
            background: "#0B8F3C",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ✅ Create Lead in Salesforce
        </button>
      </div>
    </main>
  );
}