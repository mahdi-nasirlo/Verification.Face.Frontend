"use client";

import { Avatar, Button, Card, Descriptions, Typography } from "antd";
import { User2Icon } from "lucide-react";
import ChangeProfile from "./components/ChangeProfile";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState<boolean>(false);

  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+123 456 7890",
    location: "New York, USA",
    interests: ["Coding", "Design", "Travel", "Photography"],
  };

  return (
    <>
      <div className="mb-5">
        <Typography className="text-lg">پروفایل</Typography>
      </div>
      <div className="flex gap-3">
        <Card>
          <div className="text-center space-y-4">
            <Avatar
              size={100}
              icon={<User2Icon />}
              style={{ backgroundColor: "#87d068" }}
            />
            <Button onClick={() => setOpen(true)}>اپلود تصویر جدید</Button>
            {open && <ChangeProfile open={open} setOpen={setOpen} />}
          </div>
        </Card>
        <Card className="flex-grow">
          <Typography className="text-lg mb-4">اطلاعات شخصی</Typography>
          <Descriptions bordered>
            <Descriptions.Item label="ایمیل">
              {userProfile.email}
            </Descriptions.Item>
            <Descriptions.Item label="موبایل">
              {userProfile.phone}
            </Descriptions.Item>
            <Descriptions.Item label="نام و نام خانوادگی">-</Descriptions.Item>
            <Descriptions.Item label="جنسیت">مرد</Descriptions.Item>
            <Descriptions.Item label="تاریخ تولد">-</Descriptions.Item>
            <Descriptions.Item label="کد ملی">-</Descriptions.Item>
            <Descriptions.Item label="موقعیت">
              {userProfile.location}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </>
  );
}
