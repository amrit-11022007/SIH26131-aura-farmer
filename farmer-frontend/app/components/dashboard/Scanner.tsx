"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export default function Scanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  // Start the camera
  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // use rear camera on mobile
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setUploadStatus("Camera access denied. Please allow permissions.");
    }
  }, []);

  // Stop the camera
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, [stream]);

  // Capture a frame from the video
  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setCapturedImage(imageDataUrl);
      }
    }
  }, []);

  // Upload the captured image to the server
  const uploadImage = useCallback(async () => {
    if (!capturedImage) return;

    setUploading(true);
    setUploadStatus("");

    try {
      // Convert data URL to Blob
      const blob = await (await fetch(capturedImage)).blob();
      const formData = new FormData();
      formData.append("image", blob, "scan.jpg");

      const res = await fetch("/api/upload-scan", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setUploadStatus(`✅ Saved to: ${data.filePath}`);
    } catch (err) {
      console.error(err);
      setUploadStatus("❌ Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }, [capturedImage]);
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="relative w-full max-w-md">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full rounded-lg border border-gray-300"
        />
        {!stream && (
          <button
            onClick={startCamera}
            className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-lg font-bold rounded-lg"
          >
            Start Camera
          </button>
        )}
      </div>

      {stream && (
        <div className="flex gap-3">
          <button
            onClick={captureImage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Capture
          </button>
          <button
            onClick={stopCamera}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Stop Camera
          </button>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {capturedImage && (
        <div className="flex flex-col items-center gap-2">
          <img
            src={capturedImage}
            alt="Captured"
            className="max-w-xs rounded-lg border"
          />
          <button
            onClick={uploadImage}
            disabled={uploading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Save Image"}
          </button>
        </div>
      )}

      {uploadStatus && <p className="text-sm">{uploadStatus}</p>}
    </div>
  );
}
