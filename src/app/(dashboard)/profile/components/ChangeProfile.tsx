import { Alert, Button, Divider, Modal, Progress, Typography } from "antd";
import * as faceapi from "face-api.js";
import {
  FileWarning,
  LucideCheckCircle,
  LucideMessageCircleWarning,
} from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TCurrentState {
  total: number;
  time: Date;
  score: number;
  coverage: number;
  isCentered: boolean;
}

export default function ChangeProfile({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [current, setCurrent] = useState<TCurrentState>({
    coverage: 0,
    score: 0,
    time: new Date(),
    total: 0,
    isCentered: false,
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

      const faceBox = detections[0]?.box;
      const videoCenterX = video.offsetWidth / 2;
      const videoCenterY = video.offsetHeight / 2;

      const faceCenterX = faceBox?.x + faceBox?.width / 2;
      const faceCenterY = faceBox?.y + faceBox?.height / 2;

      const isCentered =
        Math.abs(faceCenterX - videoCenterX) < video.offsetWidth * 0.1 &&
        Math.abs(faceCenterY - videoCenterY) < video.offsetHeight * 0.1;

      setCurrent({
        total: detections.length,
        score: detections[0]?.score || 0,
        time: new Date(),
        coverage:
          (faceBox?.height * faceBox?.width) /
            (video?.offsetHeight * video?.offsetWidth) || 0,
        isCentered,
      });
    }, 900);
  };

  useEffect(() => {
    const allConditionsMet =
      current.total === 1 &&
      current.score >= 0.8 &&
      current.coverage >= 0.1 &&
      current.isCentered; // Include center check

    if (allConditionsMet) {
      setErrorMessage(null); // Clear any previous errors
      if (timer === null) {
        setTimer(10); // Start the countdown if not already started
      }
    } else {
      if (!isSuccess) {
        setTimer(null);
      }

      // setTimer(0); // Reset the timer if conditions fail
      if (current.total === 0) {
        setErrorMessage("لطفا در مقابل دوربین بایستید");
      } else if (current.total > 1) {
        setErrorMessage("لطفا فقط یک نفر در مقابل دوربین بایستید");
      } else if (current.score < 0.7) {
        setErrorMessage("لطفا در مقابل دوربین ثابت بایستید");
      } else if (current.coverage > 0.3) {
        setErrorMessage("لطفا از دوربین فاصله بگیرید");
      } else if (current.coverage < 0.1) {
        setErrorMessage("لطفا نزدیک تر به دوربین بایستید");
      } else if (!current.isCentered) {
        setErrorMessage("لطفا صورت خود را در مرکز تصویر قرار دهید");
      }
    }
  }, [current, isSuccess, timer]);

  useEffect(() => {
    if (timer !== null && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => (prev !== null ? prev - 1 : null));
      }, 500); // Adjust interval to 1 second for better UX
      return () => clearInterval(intervalId);
    } else if (timer === 0) {
      setIsSuccess(true);
      setTimeout(() => {
        setOpen(false);
      }, 1000);
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

  useEffect(() => {
    console.log({ isSuccess, timer });
  }, [timer, isSuccess]);

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
          {timer !== 0 && !isSuccess ? (
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
              <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center pointer-events-none">
                <div className="relative flex justify-center items-center size-12 border-4 border-dashed border-white border-opacity-50 rounded-full">
                  <div className="absolute size-2 bg-white bg-opacity-50 rounded-full"></div>
                </div>
              </div>
              {timer !== null && timer > 0 && (
                <Progress
                  className="mt-4"
                  strokeLinecap="butt"
                  percent={(10 - timer) * 10}
                />
              )}
              {errorMessage && (
                <div
                  dir="rtl"
                  className="mt-4 p-2 flex gap-2 items-center text-sm text-red-600 rounded-lg bg-zinc-400 "
                  role="alert"
                >
                  <span className="font-medium">
                    <FileWarning />
                  </span>
                  {errorMessage}
                </div>
              )}
            </>
          ) : (
            timer === 0 &&
            isSuccess && (
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
            )
          )}
        </div>
      </Modal>
    </>
  );
}
