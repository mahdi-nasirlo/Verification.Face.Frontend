"use client";

import { motion } from "framer-motion";
import React, { HTMLProps, useLayoutEffect, useState } from "react";

interface Props {
  className?: HTMLProps<HTMLElement>["className"]
  BreadcrumbList?: {
    label: string;
    pathName?: string;
    icon?: React.ComponentType<{ className: string | undefined }>;
  }[];
  backLink?: string;
  actions?: React.ReactNode[];
  children: React.ReactNode;
}

export default function BreadcrumbPage({
  className,
  children,
}: Props) {

  const [showChildren, setShowChildren] = useState(false);

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      setShowChildren(true);
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={className + " m-3 xl:m-8"}>
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
          <div className="max-h-[87vh] lg:max-h-[85vh] overflow-y-auto h-full p-3 lg:p-5 bg-white border overflow-x-hidden rounded-md">
            {children}
          </div>
        </motion.div>
      )}
    </div>
  );
}
