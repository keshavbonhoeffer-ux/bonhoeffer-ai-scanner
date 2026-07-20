"use client";

import { useRef, useState } from "react";

import UploadCard from "./components/UploadCard";
import PreviewCard from "./components/PreviewCard";
import LoadingCard from "./components/LoadingCard";
import ResultCard from "./components/ResultCard";

export default function Home() {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Open file picker
  const handleScan = () => {
    fileInputRef.current.click();
  };

  // Select image
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

  // Analyze image
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

  // Choose another image
  const handleChangeImage = () => {
    setSelectedFile(null);
    setPreview("");
    setResult(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />

      {!preview && !loading && !result && (
        <UploadCard onScan={handleScan} />
      )}

      {preview && !loading && !result && (
        <PreviewCard
          image={preview}
          fileName={selectedFile?.name}
          onAnalyze={handleAnalyze}
          onChangeImage={handleChangeImage}
        />
      )}

      {loading && <LoadingCard />}

      {!loading && result && <ResultCard data={result} />}
    </main>
  );
}