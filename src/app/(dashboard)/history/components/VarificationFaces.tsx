import { _face } from "@/root/src/constants/Face";
import { _recognition } from "@/root/src/constants/Recognition";
import useGetInfo from "@/root/src/hooks/Face/useGetInfo";
import { Alert, Card, Descriptions, Modal } from "antd";
import moment from "jalali-moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface TData {
  uid: string;
  createdAt: string;
  status: number;
  faces: {
    count: number;
    result: {
      recognition_uid: string;
      results: {
        face_uid: string;
        similarity: number;
      }[];
    }[];
  };
}

export default function VarificationFaces({ data }: { data: TData }) {
  const [face, setFace] = useState<string>();

  const info = useGetInfo({ uid: face });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(info.data);
  }, [info]);
  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="w-full h-full"
        hoverable
        cover={
          <div className="relative">
            <Image
              className="w-full object-cover h-52"
              width={500}
              height={500}
              src={
                process.env.NEXT_PUBLIC_API_URL +
                `${_recognition.download.url}${data.uid}?status=${data.status}`
              }
              alt="example"
            />
          </div>
        }
      >
        <div className="flex justify-between items-center">
          <span>تاریخ جستوجو:</span>
          <span>{moment.from(data.createdAt, "en").format("YYYY/MM/DD")}</span>
        </div>
      </Card>
      <Modal
        width={1000}
        footer={[]}
        title="چهره های مورد جستوجو"
        open={open}
        onCancel={() => setOpen(false)}
        className="max-h-[500px] top-7"
      >
        <Alert
          className="mt-4"
          message="برای مشاهده اطلاعات بیشتر بر روی عکس کلیک کنید"
          type="warning"
        />
        <div className={`flex my-3 gap-4 ${!face && "hidden"}`}>
          <Image
            className="object-cover w-full h-40 rounded-md bg-white"
            width={500}
            height={500}
            src={process.env.NEXT_PUBLIC_API_URL + `${_face.blob.url}${face}`}
            alt="example"
          />
          <Descriptions title={`اطلاعات ${info.data?.Family}`}>
            <Descriptions.Item label="نام">
              {info.data?.Name || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="نام خانوادگی">
              {info.data?.Family || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="جنسیت">
              {info.data?.Bio_Gender ? "مرد" : "زن"} %
              {info.data?.Bio_Gender_Confidence}
            </Descriptions.Item>
            <Descriptions.Item label="سن">
              {info.data?.Bio_Age_Confidence}
            </Descriptions.Item>
            <Descriptions.Item label="کد ملی">
              {info.data?.Code_Melli || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="تاریخ ثبت">
              {info.data?.Face_Create_DT_Fa}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div className="mt-5">
          {data.faces.result.map((i) => (
            <div key={i.recognition_uid} className="grid grid-cols-6 gap-5">
              <Image
                className="object-cover w-full h-[177px] rounded-md bg-white"
                width={500}
                height={500}
                src={
                  process.env.NEXT_PUBLIC_API_URL +
                  `${_recognition.download.url}${i.recognition_uid}`
                }
                alt="example"
              />
              <div className="flex md:grid space-x-3 gap-3 grid-cols-5 border-primary border bg-primary bg-opacity-25 rounded p-2 col-span-5 overflow-y-scroll">
                {i.results.map((r) => (
                  <Image
                    key={r.face_uid}
                    onClick={() => setFace(r.face_uid)}
                    className="object-cover w-40 h-40 rounded-md bg-white cursor-pointer"
                    width={500}
                    height={500}
                    src={
                      process.env.NEXT_PUBLIC_API_URL +
                      `${_face.blob.url}${r.face_uid}`
                    }
                    alt="example"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
