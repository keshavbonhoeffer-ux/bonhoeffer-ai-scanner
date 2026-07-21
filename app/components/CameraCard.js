"use client";

import { useEffect, useRef } from "react";

export default function CameraCard({ onCapture, onCancel }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment",
          },
          width: {
            ideal: 1920,
          },
          height: {
            ideal: 1080,
          },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error(err);
      alert("Unable to access camera.");
      onCancel();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const file = new File([blob], "business-card.jpg", {
          type: "image/jpeg",
        });

        stopCamera();

        onCapture(file);
      },
      "image/jpeg",
      0.95
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 9999,
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          display: "none",
        }}
      />

      {/* Guide Box */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "500px",
          aspectRatio: "1.75",
          border: "3px solid white",
          borderRadius: "12px",
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.45)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 20,
          width: "100%",
          textAlign: "center",
          color: "#fff",
          fontSize: "26px",
          fontWeight: "bold",
        }}
      >
        Capture Business Card
      </div>

      {/* Bottom Controls */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "rgba(0,0,0,0.80)",
          padding: "25px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <button
          onClick={onCancel}
          style={{
            padding: "14px 28px",
            background: "#555",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          Cancel
        </button>

        <button
          onClick={captureImage}
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "#0B8F3C",
            color: "#fff",
            border: "6px solid white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          📷
        </button>
      </div>
    </div>
  );
}