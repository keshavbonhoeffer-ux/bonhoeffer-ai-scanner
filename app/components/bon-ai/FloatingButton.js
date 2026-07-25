"use client";

import Image from "next/image";

export default function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",

        width: "80px",
        height: "80px",

        borderRadius: "50%",
        border: "4px solid white",

        background: "#0B6E4F",

        cursor: "pointer",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        overflow: "hidden",

        zIndex: 9999,

        boxShadow:
          "0 0 20px rgba(11,110,79,.45), 0 10px 35px rgba(0,0,0,.25)",

        animation: "float 3s ease-in-out infinite",
      }}
    >
      <Image
        src="/images/bon-ai.png"
        alt="BON AI"
        width={60}
        height={60}
      />

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-8px);
          }

          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </button>
  );
}