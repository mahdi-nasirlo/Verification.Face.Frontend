"use client";

import { Layout, theme } from "antd";
import { motion } from "framer-motion";
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function LayoutMain({ children }: Props) {
  const {
    token: { colorPrimary, colorPrimaryBg, colorBgBase },
  } = theme.useToken();

  const scrollbarStyle: React.CSSProperties = {
    background: colorBgBase,
    scrollbarWidth: "thin",
    scrollbarColor: `${colorPrimary} ${colorPrimaryBg}`,
    overflow: "hidden !important",
  };

  return (
    <Layout className="min-h-screen max-h-screen max-w-screen">
      <motion.div
        exit={{ y: 100 }}
        transition={{ duration: 0.5 }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Header />
      </motion.div>
      <Layout>
        <Sidebar />
        <Layout.Content
          style={scrollbarStyle}
          className="flex-1 flex flex-col py-0 sm:py-0b overflow-hidden"
        >
          {/* {children} */}
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
