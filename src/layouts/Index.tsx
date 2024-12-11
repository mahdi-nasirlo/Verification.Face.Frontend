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

  return (
    <Layout className="min-h-screen max-w-screen">
      <motion.div
        exit={{ y: 100 }}
        transition={{ duration: 0.5 }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50"
      >
        <Header />
      </motion.div>
      <Content className="px-3 md:px-5 lg:px-12 mb-5">
        <Layout
          className="gap-8 pt-5 lg:pt-8 min-h-[85vh]"
          style={{
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Updated Sidebar Wrapper */}
          <div className="sticky top-[112px] h-[calc(100vh-112px)] overflow-y-auto overflow-x-hidden">
            <Sidebar />
          </div>
          {/* End Sidebar Wrapper */}
          <Content>{children}</Content>
        </Layout>
      </Content>
      {/* <Footer
        style={{ background: CustomTheme.token?.colorBgContainer }}
        className="p-2 mt-3 justify-between text-sm font-normal px-3 z-50  hidden lg:flex"
      >
        <span>
          {moment().locale("fa").format("dddd jD jMMMM jYYYY - \u0633\u0627\u0639\u062a H:mm")}
        </span>
        <span className="opacity-60">\u0646\u0633\u062e\u0647 \u06f1.\u06f0</span>
      </Footer> */}
    </Layout>
  );
}
