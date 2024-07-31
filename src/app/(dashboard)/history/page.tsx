"use client";

import { CardWrapper } from "@/root/src/components/CardWrappper";
import { _face } from "@/root/src/constants/Face";
import { _recognition } from "@/root/src/constants/Recognition";
import { useGetAll } from "@/root/src/hooks/Recognition/useGetAll";
import { Card, Row, Skeleton, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import moment from "jalali-moment";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import React from "react";
import VarificationFaces from "./components/VarificationFaces";

export default function Page() {
  const router = useRouter();

  const { data, isFetching } = useGetAll({ need_Detail: true });

  return (
    <>
      <div className="mb-5">
        <Typography className="text-lg">تاریخچه جستوجو</Typography>
      </div>
      <Card>
        <Row gutter={[16, 16]}>
          {isFetching &&
            Array.from({ length: 15 }).map((i, index) => (
              <CardWrapper key={index} slug={index} delay={0.1}>
                <Card cover={<Skeleton.Image className="w-full h-[192px]" />}>
                  <Meta title={<Skeleton.Input />} />
                </Card>
              </CardWrapper>
            ))}

          {data?.map((i, index) => (
            <CardWrapper key={index} slug={index + data.length} delay={0.1}>
              <VarificationFaces
                data={{
                  uid: i.Recognition_UID,
                  createdAt: i.Create_DT,
                  status: i.Status,
                  faces: i.Recognition_Result,
                }}
              />
            </CardWrapper>
          ))}
        </Row>
      </Card>
    </>
  );
}
