"use client";

import { motion } from "framer-motion";
import React, { HTMLProps, useLayoutEffect, useState } from "react";
import CustomTheme from "../../theme/custom-theme";
import { theme } from "antd";

interface Props {
  className?: HTMLProps<HTMLElement>["className"];
  BreadcrumbList?: {
    label: string;
    pathName?: string;
    icon?: React.ComponentType<{ className: string | undefined }>;
  }[];
  backLink?: string;
  actions?: React.ReactNode[];
  children: React.ReactNode;
}

export default function BreadcrumbPage({ className, children }: Props) {
  const {
    token: { colorPrimary, colorPrimaryBg, colorBgBase, colorBgLayout },
  } = theme.useToken();

  const [showChildren, setShowChildren] = useState(false);

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      setShowChildren(true);
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  const scrollbarStyle: React.CSSProperties = {
    background: colorBgBase,
    scrollbarWidth: "thin",
    scrollbarColor: `${colorPrimary} ${colorBgLayout}`,
    overflow: "hidden !important",
  };

  return (
    <div>
      {/* <div className="flex justify-between items-center pr-1 py-2 lg:pr-2 lg:py-3"> */}
      {/* <motion.div
          className="flex"
          transition={{ duration: 0.35 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Breadcrumb className="text-sm lg:text-base flex items-center h-9 lg:h-11">
            {BreadcrumbList.map((item, index) => (
              <Breadcrumb.Item key={index}>
                {item.pathName ? (
                  <Link
                    href={item.pathName}
                    className="flex items-center justify-center gap-2"
                  >
                    {item.icon && <item.icon className="size-4 lg:size-5" />}
                    {item.label}
                  </Link>
                ) : (
                  <motion.div
                    exit={{ x: -15 }}
                    transition={{ duration: 0.4 }}
                    initial={{ x: 15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {item.icon && <item.icon className="size-4 lg:size-5" />}
                      {item.label}
                    </div>
                  </motion.div>
                )}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </motion.div> */}
      {/* <div className="flex flex-wrap flex-row-reverse justify-start gap-2.5">
          <motion.div
            exit={{ y: 15 }}
            transition={{ duration: 0.4 }}
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {backLink && (
              <Link href={backLink}>
                <Button>بازگشت</Button>
              </Link>
            )}
          </motion.div>
          {actions?.map((item, index) => (
            <motion.div
              key={index}
              exit={{ y: 15 }}
              transition={{ duration: 0.4 }}
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {item}
            </motion.div>
          ))}
        </div> */}
      {/* </div> */}
      {showChildren && (
        <motion.div
          exit={{ y: 15, opacity: 0 }}
          transition={{ duration: 0.5 }}
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div
            style={scrollbarStyle}
            className={
              className +
              " max-h-[87vh] lg:max-h-[80vh] overflow-y-auto h-full p-3 lg:p-5 overflow-x-hidden rounded-xl "
            }
          >
            {children}
          </div>
        </motion.div>
      )}
    </div>
  );
}
