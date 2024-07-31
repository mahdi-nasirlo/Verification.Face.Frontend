import { ThemeConfig } from "antd";

const CustomTheme: ThemeConfig = {
  components: {
    Layout: {
      bodyBg: "#464951",
    },
    Input: {
      colorBorder: "rgba(117, 117, 117, 0.76)",
      activeShadow: "0 0 0 2px rgb(255 255 255 / 19%)",
    },
    Button: {
      primaryShadow: "none",
      algorithm: true,
      defaultColor: "#FFFFFF",
      defaultBorderColor: "#FFFFFF",
      borderRadius: 8,
      colorLink: "#8552D7",
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
    colorBgBase: "#373A41",
    colorTextBase: "#D3D4D4",
    colorBgContainer: "#35373C",
    colorTextDescription: "#727272",
    fontFamily: "IRANSansfanum",
    fontSize: 16,
    wireframe: false,
    colorPrimary: "#8552D7",
    colorWarningBg: "#F25937",
  },
};

export default CustomTheme;
