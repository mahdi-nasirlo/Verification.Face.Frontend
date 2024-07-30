"use client"

import React from "react";
import { Button, Card, Typography } from "antd";
import BreadcrumbPage from "@/components/breadcrumb-page/breadcrumb-page";
import { Building2, FileText, LayoutPanelLeft, Pickaxe, RefreshCcw, UsersRound } from "lucide-react";
import DemoColumnCharts from "./DemoColumnCharts";
import DemoPieCharts from "./DemoPieCharts";

interface TProps {
  data: {
    countPerson: number,
    countCompany: number,
    countProject: number,
    countProjectDoc: number
  }
}

export default function ClientPage({ data }: TProps) {

  return <BreadcrumbPage
    BreadcrumbList={[{ label: "داشبورد", icon: LayoutPanelLeft }]}
    actions={[
      <Button
        key={1}
        type="primary"
        className="w-full"
        icon={<RefreshCcw className="size-5" />}
        onClick={() => location.reload()}
      >
        به روز رسانی
      </Button>
    ]}
  >
    <div className="space-y-2 sm:space-y-4">
      <div
        className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4"
      >
        <Card>
          <div className="flex items-center justify-between">
            <span className="flex flex-col space-y-4">
              <Typography className="text-lg sm:text-xl font-semibold">
                {data.countPerson} نفر
              </Typography>
              <Typography className="text-sm sm:text-base">
                تعداد اشخاص
              </Typography>
            </span>
            <span>
              <UsersRound className="size-8" />
            </span>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <span className="flex flex-col space-y-4">
              <Typography className="text-lg sm:text-xl font-semibold">
                {data.countCompany} شرکت
              </Typography>
              <Typography className="text-sm sm:text-base">
                تعداد شرکت ها
              </Typography>
            </span>
            <span>
              <Building2 className="size-8" />
            </span>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <span className="flex flex-col space-y-4">
              <Typography className="text-lg sm:text-xl font-semibold">
                {data.countProject} پروژه
              </Typography>
              <Typography className="text-sm sm:text-base">
                تعداد پروژه ها
              </Typography>
            </span>
            <span>
              <Pickaxe className="size-8" />
            </span>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <span className="flex flex-col space-y-4">
              <Typography className="text-lg sm:text-xl font-semibold">
                {data.countProjectDoc} گزارش
              </Typography>
              <Typography className="text-sm sm:text-base">
                تعداد گزارشات
              </Typography>
            </span>
            <span>
              <FileText className="size-8" />
            </span>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        <DemoColumnCharts />
        <DemoPieCharts />
      </div>
    </div>
  </BreadcrumbPage >;
}
