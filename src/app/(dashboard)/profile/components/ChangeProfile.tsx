import { Button, Divider, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function ChangeProfile() {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  // Load Face API models
  const loadModels = async () => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models"); // Ensure models are in the public/models folder
      setIsModelLoaded(true);
    } catch (error) {
      console.error("Error loading face-api models:", error);
    }
  };

  // Start the camera
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  // Detect faces and draw on canvas
  const handleVideoPlay = async () => {
    if (!isModelLoaded || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.videoWidth, height: video.videoHeight };

    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions()
      );
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      const context = canvas.getContext("2d");
      context?.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
    }, 100);
  };

  useEffect(() => {
    if (!isModelLoaded) {
      loadModels();
    }
    if (open) {
      startVideo();
    }
  }, [isModelLoaded, open]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>اپلود تصویر جدید</Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        width={500}
        title="اپلود تصویر جدید"
      >
        <Divider />
        <div>
          <video
            ref={videoRef}
            autoPlay
            muted
            // width={640}
            // height={480}
            // onPlay={handleVideoPlay}
            className="h-full"
          />
          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            style={{ direction: "ltr" }}
            className="absolute top-0 left-0"
          />
        </div>
        <Divider />
      </Modal>
    </>
  );
}
