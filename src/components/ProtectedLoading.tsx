import { Spin, Typography } from "antd";
import Image from "next/image";
import CustomTheme from "../theme/custom-theme";

export default function StateLoading() {
  return (
    <div
      style={{ background: CustomTheme.token?.colorBgBase }}
      className="h-[100vh] flex flex-col items-center justify-center bg-network gap-6"
    >
      <Spin size="large" />
      <Typography className="text-white">درحال دریافت اطلاعات ...</Typography>
    </div>
  );
}
