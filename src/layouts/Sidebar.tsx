import { Layout } from "antd";
import CustomTheme from "../theme/custom-theme";
import { MenuItem } from "./MenuItem";
import { menuListItems } from "./MenuList";

export default function Sidebar() {
  return (
    <Layout.Sider
      style={{
        background: CustomTheme.token?.colorBgContainer,
        borderRadius: "16px !important",
      }}
      className="rounded-xl py-6 hidden lg:block max-h-[80vh]"
      width={101}
    >
      <div className="flex flex-col justify-center gap-10 overflow-hidden">
        {menuListItems.map((i, index) => (
          <MenuItem {...i} delay={0.3 * index} key={index}>
            {i.children}
          </MenuItem>
        ))}
      </div>
    </Layout.Sider>
    // <Layout.Sider
    //   style={sidebarStyle}
    //   className="hidden overflow-hidden md:flex min-w-[320px] overflow-y-auto overflow-x-hidden py-5"
    // >
    //   <div className="flex flex-col gap-3">
    //     <motion.div
    //       className="px-4"
    //       exit={{ y: 100 }}
    //       transition={{ duration: 0.5, delay: 0.3 }}
    //       initial={{ y: -100, opacity: 0 }}
    //       animate={{ y: 0, opacity: 1 }}
    //     >
    //       <SidebarAccount />
    //     </motion.div>

    //     <motion.div
    //       className="px-4"
    //       exit={{ y: 100 }}
    //       transition={{ duration: 0.5, delay: 0.8 }}
    //       initial={{ y: -20, opacity: 0 }}
    //       animate={{ y: 0, opacity: 1 }}
    //     >
    //       <LicenceInfo />
    //     </motion.div>
    //   </div>

    //   <motion.div
    //     exit={{ y: 100 }}
    //     transition={{ duration: 0.5, delay: 1 }}
    //     initial={{ y: -100, opacity: 0 }}
    //     animate={{ y: 0, opacity: 1 }}
    //   >
    //     <Divider className="my-6" />
    //     <MenuList className="min-w-[320px] items-center justify-center" />
    //   </motion.div>
    // </Layout.Sider>
  );
}
