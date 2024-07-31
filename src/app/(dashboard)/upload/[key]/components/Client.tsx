"use client";

import { Typography } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import Upload from "./Upload";

type tabType = "upload" | "list";

export default function Client({ folder_UID }: { folder_UID: string }) {
  return (
    <>
      <Typography className="text-lg mb-3">آپلود تصویر</Typography>
      <div className="flex gap-5 flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={"upload"}
            transition={{ duration: 0.3 }}
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: 60, opacity: 0 }}
            exit={{ x: -60, opacity: 0 }}
          >
            <Upload folder_UID={folder_UID} />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
