"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, notification, theme } from "antd";
import frFR from "antd/locale/fa_IR";
import CustomTheme from "@/theme/custom-theme";
import useThemeMode from "@/components/mode-toggle/use-theme-mode";

interface Props {
  children: React.ReactNode;
}

export default function AntdDesign({ children }: Props) {
  const { mode } = useThemeMode();

  const { compactAlgorithm, darkAlgorithm, defaultAlgorithm } = theme;

  notification.config({
    placement: "topLeft",
  });

  return (
    <AntdRegistry>
      <ConfigProvider
        locale={frFR}
        direction="rtl"
        theme={{
          ...CustomTheme,
          algorithm: [
            mode == "dark" ? darkAlgorithm : defaultAlgorithm,
            compactAlgorithm,
          ],
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
