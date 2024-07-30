import { Dropdown, MenuProps } from "antd";
import useThemeMode from "./use-theme-mode";
import { MonitorSmartphone, Moon, Sun } from "lucide-react";

export default function ModeToggle() {
  const { mode, setMode, setSystem } = useThemeMode();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "روشن",
      icon: <Sun />,
      onClick: () => setMode("light"),
    },
    {
      key: "2",
      label: "تاریک",
      onClick: () => setMode("dark"),
      icon: <Moon />,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "سیستم",
      onClick: () => setSystem(),
      icon: <MonitorSmartphone />,
    },
  ];

  return (
    <Dropdown
      arrow
      menu={{ items }}
      trigger={["click"]}
      placement="bottom"
    >
      <div className="cursor-pointer">
        {mode === "dark" ? (
          <Sun className="size-5 md:size-6" />
        ) : (
          <Moon className="size-5 md:size-6" />
        )}
        <span className="sr-only">theme</span>
      </div>
    </Dropdown>
  );
}
