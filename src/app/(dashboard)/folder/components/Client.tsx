"use client";

import BreadcrumbPage from "@/root/src/components/breadcrumb-page/breadcrumb-page";
import { useGetParent } from "@/root/src/hooks/Folder/useParent";
import { Button, Card, Input, Typography } from "antd";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, CreditCard, Image, Plus, Search } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { motion } from "framer-motion";
import Add from "./Add";
import List from "./List";
import { changeTabVariant } from "@/root/src/utils/variants";
import { Joan } from "next/font/google";

type tabType = "list" | "add";

export default function Client({ parent_UID }: { parent_UID?: string | null }) {
  const [tab, setTab] = useState<tabType>("list");

  const { data } = useGetParent({ folder_UID: parent_UID });

  const router = useRouter();

  return (
    <>
      <Typography className="text-lg">مدیریت پوشه ها</Typography>
      <div className="flex justify-between overflow-hidden overflow-x-auto py-3 pr-1">
        <div className="flex gap-3">
          <Button
            onClick={() => setTab("list")}
            type={tab == "add" ? "default" : "primary"}
            icon={<CreditCard />}
          >
            لیست پوشه ها
          </Button>
          <Button
            onClick={() => setTab("add")}
            type={tab == "list" ? "default" : "primary"}
            icon={<Plus />}
          >
            افزودن پوشه جدید
          </Button>
          {
            <Button
              onClick={() =>
                router.push(`/upload/${parent_UID ? parent_UID : "root"}`)
              }
              icon={<Image />}
            >
              آپلود تصویر
            </Button>
          }
          {parent_UID !== null && (
            <Button
              onClick={() =>
                router.push(
                  "/folder/" +
                    (data?.[0]?.Folder_UID ? data?.[0]?.Folder_UID : "root")
                )
              }
              type="link"
              className="text-secondary"
              icon={<ArrowRight />}
            >
              بازگشت به {data?.[0]?.Folder_Name ?? "root"}
            </Button>
          )}
        </div>
        {tab == "list" && (
          <div className="max-w-96 hidden lg:block relative mb-5 flex-grow items-center">
            <Input size="large" placeholder="جستجو..." />
            <Search className="absolute top-1 left-1" />
          </div>
        )}
      </div>
      <Card>
        <div className="flex flex-col gap-5">
          <div>
            <AnimatePresence mode="wait">
              {tab == "list" && (
                <motion.div
                  key={"list"}
                  variants={changeTabVariant}
                  animate="animation"
                  initial="initial"
                  exit="exit"
                >
                  <List parent_UID={parent_UID} />
                </motion.div>
              )}

              {tab == "add" && (
                <motion.div
                  key={"add"}
                  variants={changeTabVariant}
                  animate="animation"
                  initial="initial"
                  exit="exit"
                >
                  <Add setTab={setTab} parent_UID={parent_UID} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </>
  );
}
