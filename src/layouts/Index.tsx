"use client";

import { Layout, theme } from "antd";
import { motion } from "framer-motion";
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import CustomTheme from "../theme/custom-theme";
import moment from "jalali-moment";

interface Props {
  children: React.ReactNode;
}

const { Content, Footer } = Layout;

export default function LayoutMain({ children }: Props) {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  // const scrollbarStyle: React.CSSProperties = {
  //   background: colorBgBase,
  //   scrollbarWidth: "thin",
  //   scrollbarColor: `${colorPrimary} ${colorPrimaryBg}`,
  //   overflow: "hidden !important",
  // };

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
      <Content className="px-1 lg:px-12">
        <Layout
          className="gap-8 pt-5 lg:pt-11 min-h-[85vh]"
          style={{
            borderRadius: borderRadiusLG,
          }}
        >
          <Sidebar />
          <Content>{children}</Content>
        </Layout>
      </Content>
      <Footer
        style={{ background: CustomTheme.token?.colorBgContainer }}
        className="p-2 flex justify-between text-sm font-normal px-3 z-50"
      >
        <span>
          {moment().locale("fa").format("dddd jD jMMMM jYYYY - ساعت H:mm")}
        </span>
        <span className="opacity-60">نسخه ۱.۰</span>
      </Footer>
    </Layout>
  );
}
