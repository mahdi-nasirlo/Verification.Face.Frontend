"use client";

import BreadcrumbPage from "@/root/src/components/breadcrumb-page/breadcrumb-page";
import { Button, Steps, Typography } from "antd";
import { AnimatePresence } from "framer-motion";
import { CreditCard, CreditCardIcon, Image } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Upload from "./Upload";
import { useRouter } from "next-nprogress-bar";
import { changeTabVariant } from "@/root/src/utils/variants";
import List from "../../../folder/components/List";

type tabType = "upload" | "list";

export default function Client({ folder_UID }: { folder_UID: string }) {
  return (
    <>
      <Typography className="text-lg">آپلود تصویر</Typography>
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
