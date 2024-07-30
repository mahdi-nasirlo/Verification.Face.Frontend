import AccountMenu from "@/components/account-menu/account-menu";
import { Button, Drawer, Layout, theme, Typography } from "antd";
import { motion } from "framer-motion";
import { LucideScanFace, MenuIcon, SquareLibrary } from "lucide-react";
import React, { useState } from "react";
import MenuList from "./MenuList";

export default function Header() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const BgStyle: React.CSSProperties = {
    backgroundColor: colorBgContainer,
  };

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Layout.Header
        style={BgStyle}
        className="flex items-center justify-between px-1.5 md:px-3 lg:px-5 min-h-16 md:min-h-20"
      >
        <span className="block md:hidden">
          <Button type="text" size="small" onClick={() => setOpen(true)}>
            <MenuIcon />
          </Button>
        </span>
        <div>
          <motion.div
            exit={{ y: 100 }}
            transition={{ duration: 0.5 }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Typography className="font-bold text-lg">
              سرویس تشخیص چهره
            </Typography>
          </motion.div>
        </div>

        <AccountMenu />
      </Layout.Header>
      <Drawer
        width={300}
        open={open}
        onClose={() => setOpen(false)}
        style={BgStyle}
        title={
          <motion.div
            exit={{ y: 100 }}
            transition={{ duration: 0.5 }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="grid w-full md:px-6 min-h-10 md:min-h-14">
              <Typography className="flex items-center justify-between text-sm font-semibold xl:text-base xl:font-semibold">
                سرویس تشخیص چهره
                <LucideScanFace className="size-6 xl:size-8" />
              </Typography>
            </div>
          </motion.div>
        }
      >
        <MenuList onClose={() => setOpen(false)} />
      </Drawer>
    </>
  );
}
