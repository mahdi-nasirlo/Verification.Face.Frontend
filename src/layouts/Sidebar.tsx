import { Divider, Layout, theme } from "antd";
import { motion } from "framer-motion";
import React from "react";
import SidebarAccount from "../components/account-menu/sidebar-account";
import LicenceInfo from "../components/LicenceInfo";
import MenuList from "./MenuList";

export default function Sidebar() {
  const sidebarStyle: React.CSSProperties = {
    width: "320px",
    direction: "ltr",
  };

  return (
    <Layout.Sider
      style={sidebarStyle}
      className="hidden overflow-hidden md:flex min-w-[320px] overflow-y-auto overflow-x-hidden py-5"
    >
      <div className="flex flex-col gap-3">
        <motion.div
          className="px-4"
          exit={{ y: 100 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <SidebarAccount />
        </motion.div>

        <motion.div
          className="px-4"
          exit={{ y: 100 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <LicenceInfo />
        </motion.div>
      </div>

      <motion.div
        exit={{ y: 100 }}
        transition={{ duration: 0.5, delay: 1 }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Divider className="my-6" />
        <MenuList className="min-w-[320px] items-center justify-center" />
      </motion.div>
    </Layout.Sider>
  );
}
