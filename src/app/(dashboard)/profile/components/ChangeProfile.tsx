import { Button, Divider, Modal, Typography } from "antd";
import * as faceapi from "face-api.js";
import { LucideCheckCircle, LucideMessageCircleWarning } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TCurrentState {
  total: number;
  time: Date;
  score: number;
  coverage: number;
}

export default function ChangeProfile({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [current, setCurrent] = useState<TCurrentState>({
    coverage: 0,
    score: 0,
    time: new Date(),
    total: 0,
  });
  const [timer, setTimer] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadModels = async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      ]);
      setIsModelLoaded(true);
    } catch (error) {
      console.error("Error loading face-api models:", error);
    }
  };

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

  const handleVideoPlay = async () => {
    if (!isModelLoaded || !videoRef.current) return;

    const video = videoRef.current;

    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions()
      );

      setCurrent({
        total: detections.length,
        score: detections?.[0]?.score || 0,
        time: new Date(),
        coverage:
          (detections?.[0]?.box?.height * detections?.[0]?.box?.width) /
            (video.offsetHeight * video.offsetWidth) || 0,
      });
    }, 500);
  };

  useEffect(() => {
    const allConditionsMet =
      current.total === 1 && current.score >= 0.8 && current.coverage >= 0.1;

    if (allConditionsMet) {
      setErrorMessage(null);
      if (timer === null) {
        setTimer(10); // Start the countdown if not already started
      }
    } else {
      setTimer(null); // Reset the timer if conditions fail
      if (current.total === 0) {
        setErrorMessage("لطفا در مقابل دوربین بایستید");
      } else if (current.total > 1) {
        setErrorMessage("لطفا فقط یک نفر در مقابل دوربین بایستید");
      } else if (current.score < 0.8) {
        setErrorMessage("لطفا در مقابل دوربین ثابت بایستید");
      } else if (current.coverage > 0.5) {
        setErrorMessage("لطفا از دوربین فاصله بگیرید");
      } else if (current.coverage < 0.1) {
        setErrorMessage("لطفا نزدیک تر به دوربین بایستید");
      }
    }
  }, [current, timer]);

  useEffect(() => {
    if (timer !== null && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (timer === 0) {
      // Close modal after 1 second
      setTimeout(() => setOpen(false), 1000);
    }
  }, [setOpen, timer]);

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
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        width={500}
        title="اپلود تصویر جدید"
        footer={null}
      >
        <Divider />
        <div className="relative">
          {timer !== 0 && (
            <>
              <video
                ref={videoRef}
                autoPlay
                muted
                width={640}
                height={480}
                onPlay={handleVideoPlay}
                className="mx-auto w-full top-0 left-0 transform scale-x-[-1]"
              />
              {errorMessage && (
                <div className="absolute w-full h-full top-0 gap-8 left-0 flex items-center justify-center flex-col backdrop-blur-sm bg-gray-800/70">
                  <LucideMessageCircleWarning className="size-48" />
                  <span dir="rtl" className="font-normal text-3xl">
                    {errorMessage}
                  </span>
                </div>
              )}
              {timer !== null && (
                <div className="absolute w-full h-full top-0 gap-8 left-0 flex items-center justify-center flex-col backdrop-blur-sm bg-green-600/70">
                  <Typography className="text-white text-5xl">
                    {timer}
                  </Typography>
                </div>
              )}
            </>
          )}
          {timer === 0 && (
            <motion.div
              className="w-full h-full top-0 gap-8 left-0 flex items-center justify-center flex-col backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <LucideCheckCircle className="size-20 text-white" />
              <span dir="rtl" className="font-normal text-xl text-white">
                تصویر با موفقیت آپلود شد
              </span>
            </motion.div>
          )}
        </div>
      </Modal>
    </>
  );
}
