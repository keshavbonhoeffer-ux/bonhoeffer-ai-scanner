"use client";

import { useRef, useState } from "react";

import UploadCard from "./components/UploadCard";
import CameraCard from "./components/CameraCard";
import PreviewCard from "./components/PreviewCard";
import LoadingCard from "./components/LoadingCard";
import ResultCard from "./components/ResultCard";

export default function Home() {
  const galleryInputRef = useRef(null);

  const [cameraOpen, setCameraOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // ===============================
  // CAMERA
  // ===============================

  const handleCameraClick = () => {
    setCameraOpen(true);
  };

  const handleCameraCancel = () => {
    setCameraOpen(false);
  };

  const handleCameraCapture = (file) => {
    setCameraOpen(false);

    setSelectedFile(file);
    setResult(null);

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // ===============================
  // GALLERY
  // ===============================

  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setResult(null);

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // ===============================
  // ANALYZE
  // ===============================

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);

    try {
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const base64 = reader.result.split(",")[1];

          const response = await fetch("/api/analyze", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: base64,
            }),
          });

          const data = await response.json();

          setLoading(false);

          if (data.success) {
            setResult(data.result);
          } else {
            alert(data.error || "AI analysis failed");
          }
        } catch (err) {
          setLoading(false);
          console.error(err);
          alert("Something went wrong.");
        }
      };

      reader.readAsDataURL(selectedFile);
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Unable to analyze image.");
    }
  };

  // ===============================
  // CHANGE IMAGE
  // ===============================

  const handleChangeImage = () => {
    setSelectedFile(null);
    setPreview("");
    setResult(null);

    if (galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
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
      {/* Gallery Input */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />

      {/* Live Camera */}
      {cameraOpen && (
        <CameraCard
          onCapture={handleCameraCapture}
          onCancel={handleCameraCancel}
        />
      )}

      {/* Home */}
      {!cameraOpen && !preview && !loading && !result && (
        <UploadCard
          onCameraClick={handleCameraClick}
          onGalleryClick={handleGalleryClick}
        />
      )}

      {/* Preview */}
      {!cameraOpen && preview && !loading && !result && (
        <PreviewCard
          image={preview}
          fileName={selectedFile?.name}
          onAnalyze={handleAnalyze}
          onChangeImage={handleChangeImage}
        />
      )}

      {/* Loading */}
      {!cameraOpen && loading && <LoadingCard />}

      {/* Result */}
      {!cameraOpen && !loading && result && (
        <ResultCard data={result} />
      )}
    </main>
  );
}