"use client";

import React from "react";
import { Button, Card, Typography } from "antd";
import BreadcrumbPage from "@/components/breadcrumb-page/breadcrumb-page";
import {
  Building2,
  FileText,
  LayoutPanelLeft,
  Pickaxe,
  RefreshCcw,
  UsersRound,
} from "lucide-react";
import DemoColumnCharts from "./DemoColumnCharts";
import DemoPieCharts from "./DemoPieCharts";

interface TProps {
  data: {
    countPerson: number;
    countCompany: number;
    countProject: number;
    countProjectDoc: number;
  };
}

export default function ClientPage({ data }: TProps) {
  return (
    <BreadcrumbPage
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
        </Button>,
      ]}
    >
      <div className="space-y-2 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
          <DemoColumnCharts />
          <DemoPieCharts />
        </div>
      </div>
    </BreadcrumbPage>
  );
}
