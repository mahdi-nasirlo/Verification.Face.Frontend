import { Spin } from "antd";
import Image from "next/image";
import CustomTheme from "../theme/custom-theme";

export default function StateLoading() {
  return (
    <div
      style={{ background: CustomTheme.token?.colorBgBase }}
      className="h-[100vh] flex items-center justify-center bg-network"
    >
      <Spin size="large" />
    </div>
  );
}
