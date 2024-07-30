import { ThemeConfig } from "antd";

const CustomTheme: ThemeConfig = {
  components: {
    Input: {
      colorBorder: "rgba(117, 117, 117, 0.76)",
      activeShadow: "0 0 0 2px rgb(255 255 255 / 19%)",
    },
    Button: {
      algorithm: true,
      defaultColor: "#FFFFFF",
      defaultBorderColor: "#FFFFFF",
      borderRadius: 8,
      defaultShadow: "none",
    },
    Divider: {
      margin: 50,
    },
    Menu: {
      borderRadius: 0,
      itemSelectedBg: "#F3F7FC",
      itemSelectedColor: "#434347",
      itemColor: "#434347",
    },
  },
  token: {
    colorBgLayout: "#11112d",
    colorBgBase: "#0d0b1d",
    colorTextBase: "#D3D4D4",
    colorBgContainer: "#0d0b1d",
    colorTextDescription: "#727272",
    fontFamily: "IRANSansfanum",
    fontSize: 16,
    wireframe: false,
    colorPrimary: "#2435BA",
    colorWarningBg: "#F25937",
  },
};

export default CustomTheme;