import { Descriptions, theme } from "antd";
import React from "react";

export default function LicenceInfo() {
  const {
    token: { colorText },
  } = theme.useToken();

  return (
    <div className="bg-secondary rounded-md p-3">
      <Descriptions
        column={1}
        contentStyle={{
          justifyContent: "end",
          fontWeight: 700,
          fontSize: 14,
          color: colorText,
        }}
        labelStyle={{ content: "" }}
        title="اطلاعات اشتراک"
      >
        <Descriptions.Item label="تعداد جستجو های مجاز">1000</Descriptions.Item>
        <Descriptions.Item label="تعداد جستجوی مجاز باقی مانده ">
          750
        </Descriptions.Item>
        <Descriptions.Item label="میزان حجم مجاز">
          500 <span className="font-normal px-1">مگابایت</span>
        </Descriptions.Item>
        <Descriptions.Item label="میزان حجم مجاز باقی مانده">
          350 <span className="font-normal px-1">مگابایت</span>
        </Descriptions.Item>
        <Descriptions.Item label="نفرات زیرمجموعه">
          5 <span className="font-normal px-1">نفر</span>
        </Descriptions.Item>
        <Descriptions.Item label="زمان ورود">
          1403/03/07 12:53
        </Descriptions.Item>
        <Descriptions.Item label="ورود قبلی">
          1403/02/18 14:25
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
