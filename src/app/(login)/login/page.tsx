"use client";

import useAuthentication, {
  LoginType,
} from "@/root/src/hooks/useAuthentication";
import CustomTheme from "@/root/src/theme/custom-theme";
import {
  Button,
  Card,
  Col,
  ColProps,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Page() {
  const [form] = useForm();

  const login = useAuthentication();

  const colConfig: ColProps = { xs: 24 };

  const handleSubmit = async (values: LoginType) => {
    const res = await login.mutateAsync(values);

    if (typeof res == "string") {
      await signIn("credentials", {
        name: "ادمین",
        token: res,
        redirect: true,
      });
    }
  };

  return (
    <Card
      style={{ boxShadow: "0px 2px 12px 0px #5B5F9A4D" }}
      className="max-w-[492px] min-h-[550px] mx-auto flex items-center p-9"
    >
      <div className="space-y-14">
        <motion.div
          transition={{ duration: 0.2 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Typography className="w-full text-xl font-semibold">
            ورود به سرویس تشخیص چهره
          </Typography>
        </motion.div>
        <motion.div
          transition={{ duration: 0.55 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Form
            form={form}
            disabled={login.isPending}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Row gutter={[16, 16]}>
              <Col {...colConfig}>
                <Form.Item<LoginType>
                  name="userName"
                  label="نام کاربری / کد ملی"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col {...colConfig}>
                <Form.Item<LoginType> name="password" label="رمز عبور">
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </motion.div>
        <motion.div
          className="space-y-5"
          transition={{ duration: 0.55 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Button
            loading={login.isPending}
            size="large"
            type="primary"
            className="w-full"
            htmlType="submit"
            onClick={() => form.submit()}
            icon={<LogIn className="size-5" />}
          >
            ورود
          </Button>
          <Typography
            className="w-full text-center"
            style={{ color: CustomTheme.token?.colorTextDescription }}
          >
            رمز عبور را فراموش کرده اید؟
          </Typography>
        </motion.div>
      </div>
    </Card>
  );
}
