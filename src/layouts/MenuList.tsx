import React, { useEffect, useState, useCallback } from "react";
import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArchiveRestore, BookUser, Building, CircleUser, FolderOpen, LayoutPanelLeft, NotebookTabs, PencilRuler, ReceiptText, ScanSearchIcon, UserRoundCog } from "lucide-react";

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

const items: ItemMenu[] = [
  { key: "1", url: "/dashboard", label: "داشبورد", icon: <LayoutPanelLeft /> },
  { key: "3", url: "/folder", label: "مدیریت پوشه", icon: <FolderOpen /> },
  { key: "4", url: "/search", label: "استعلام", icon: <ScanSearchIcon /> },
];

const findKeys = (pathname: string, items: ItemMenu[]): { openKeys: string[]; selectedKey: string } => {
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

const MenuList: React.FC<{ className?: string; onClose?: () => void }> = ({ className, onClose }) => {
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>("");

  useEffect(() => {
    const { openKeys, selectedKey } = findKeys(pathname, items);
    setOpenKeys(openKeys);
    setSelectedKey(selectedKey);
  }, [pathname]);

  const renderMenuItem = useCallback((item: ItemMenuChild | ItemMenu) => {
    if (item.type === "divider") {
      return (<Menu.Divider key={item.key} />);
    }
    if (item.type === "group" && item.children) {
      return (
        <Menu.ItemGroup key={item.key} title={item.label}>
          {item.children.map(child => renderMenuItem(child))}
        </Menu.ItemGroup>
      );
    }
    if (item.children) {
      return (
        <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
          {item.children.map(child => renderMenuItem(child))}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={item.key} icon={item.icon} onClick={onClose}>
        <Link href={item.url || "#"}>{item.label}</Link>
      </Menu.Item>
    );
  }, [onClose]);

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
        onOpenChange={keys => setOpenKeys(keys as string[])}
      >
        {items.map((item) => renderMenuItem(item))}
      </Menu>
    </motion.div>
  );
};

export default MenuList;
