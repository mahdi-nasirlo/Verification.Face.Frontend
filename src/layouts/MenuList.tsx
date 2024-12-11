import { Menu } from "antd";
import { motion } from "framer-motion";
import {
  Camera,
  FolderOpen,
  HistoryIcon,
  HomeIcon,
  ImagePlus,
  Search,
  User2Icon,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { TMenuItem } from "./MenuItem";

export const menuListItems: TMenuItem[] = [
  {
    icon: HomeIcon,
    href: "/dashboard",
    children: "خانه",
  },
  {
    icon: FolderOpen,
    href: "/folder",
    children: "پوشه ها",
  },
  {
    icon: ImagePlus,
    href: "/upload/root",
    children: "تصاویر",
  },
  {
    icon: Search,
    href: "/search",
    children: "استعلام",
  },
  {
    icon: HistoryIcon,
    href: "/history",
    children: "تاریخچه",
  },
  {
    icon: User2Icon,
    href: "/profile",
    children: "پروفایل",
  },
];

interface ItemMenuChild {
  key: string;
  url?: string;
  label?: string;
  icon?: React.ReactNode;
  type?: "divider" | "group";
  children?: ItemMenuChild[];
}

interface ItemMenu {
  key: string;
  url?: string;
  label?: string;
  type?: "divider" | "group";
  icon?: React.ReactNode;
  children?: ItemMenuChild[];
}

const items: ItemMenu[] = menuListItems.map((i, index) => ({
  key: `${index}`,
  label: i.children as string,
  icon: <i.icon />,
  url: i.href,
}));

const findKeys = (
  pathname: string,
  items: ItemMenu[]
): { openKeys: string[]; selectedKey: string } => {
  let openKeys: string[] = [];
  let selectedKey: string = "";

  const traverse = (items: ItemMenu[], parentKey: string[] = []) => {
    for (const item of items) {
      const currentKey = [...parentKey, item.key];

      if (item.children) {
        traverse(item.children, currentKey);
      }

      if (item.url && pathname.startsWith(item.url)) {
        if (!selectedKey || item.url.length > selectedKey.length) {
          selectedKey = item.key;
          openKeys = currentKey;
        }
      }
    }
  };

  traverse(items);
  return { openKeys, selectedKey };
};

const MenuList: React.FC<{ className?: string; onClose?: () => void }> = ({
  className,
  onClose,
}) => {
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>("");

  useEffect(() => {
    const { openKeys, selectedKey } = findKeys(pathname, items);
    setOpenKeys(openKeys);
    setSelectedKey(selectedKey);
  }, [pathname]);

  const renderMenuItem = useCallback(
    (item: ItemMenuChild | ItemMenu) => {
      if (item.type === "divider") {
        return <Menu.Divider key={item.key} />;
      }
      if (item.type === "group" && item.children) {
        return (
          <Menu.ItemGroup key={item.key} title={item.label}>
            {item.children.map((child) => renderMenuItem(child))}
          </Menu.ItemGroup>
        );
      }
      if (item.children) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {item.children.map((child) => renderMenuItem(child))}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} icon={item.icon} onClick={onClose}>
          <Link href={item.url || "#"}>{item.label}</Link>
        </Menu.Item>
      );
    },
    [onClose]
  );

  return (
    <motion.div
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Menu
        mode="inline"
        className={className}
        openKeys={openKeys}
        selectedKeys={selectedKey ? [selectedKey] : []}
        onOpenChange={(keys) => setOpenKeys(keys as string[])}
      >
        {items.map((item) => renderMenuItem(item))}
      </Menu>
    </motion.div>
  );
};

MenuList;

export default MenuList;
