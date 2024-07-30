"use client";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Divider,
  Modal,
  Row,
  Typography,
} from "antd";
import {
  ChefHat,
  CircleHelp,
  Home,
  Inbox,
  LogOut,
  LogOutIcon,
  User,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AccountMenu() {
  const [open, setOpen] = useState<boolean>(false);

  const handleCancel = () => setOpen(false);

  const item = [
    <Avatar key="avatar" size={50}>
      <User className="size-8" />
    </Avatar>,
    <Typography key={"timer"} className="font-bold">
      زمان باقی مانده: <span>8:45</span>
    </Typography>,
    <div key={"head_action_1"} onClick={() => setOpen(true)}>
      <Button type="default">
        خروج
        <LogOutIcon />
      </Button>
    </div>,
  ];

  return (
    <>
      {item.map((i, index) => (
        <motion.div
          key={"head_action" + index}
          exit={{ y: 100 }}
          transition={{ duration: 0.5, delay: 0.3 * index }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {i}
        </motion.div>
      ))}
      <Modal
        title="خروج از حساب کاربری"
        open={open}
        onCancel={handleCancel}
        footer={[
          <Row key={"box"} gutter={[8, 16]}>
            <Col>
              <Button
                key={"cancel"}
                // disabled={loading}
                onClick={handleCancel}
                icon={<X className="size-5" />}
              >
                انصراف
              </Button>
            </Col>
            <Col>
              <Link href={"/login"}>
                <Button
                  danger
                  type="primary"
                  key={"submit"}
                  // loading={loading}
                  onClick={() => signOut({ redirect: true })}
                  icon={<LogOut className="size-5" />}
                >
                  خروج
                </Button>
              </Link>
            </Col>
          </Row>,
        ]}
      >
        <Divider />
        <Typography className="md:text-base">
          آیا قصد خروج از حساب کاربری خود را دارید؟
        </Typography>
        <Divider />
      </Modal>
    </>
  );
}
