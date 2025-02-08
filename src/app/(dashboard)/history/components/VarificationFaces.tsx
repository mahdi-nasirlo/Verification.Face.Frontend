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

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="w-full h-full"
        hoverable
        cover={
          <div className="relative w-full h-52 rounded-md">
            {isLoading && (
              <div className="absolute z-50 w-full h-full rounded-t-lg animate-pulse bg-gray-500"></div>
            )}
            <Image
              className="w-full p-1 rounded-t-lg object-cover h-52"
              width={500}
              height={500}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
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
          <span>تاریخ جستجو:</span>
          <span>{moment.from(data.createdAt, "en").format("YYYY/MM/DD")}</span>
        </div>
      </Card>
      <Modal
        width={1000}
        footer={[]}
        title="چهره های مورد جستجو"
        open={open}
        onCancel={() => setOpen(false)}
        className="max-h-[500px] top-7"
      >
        {data.status == 0 && (
          <Alert className="mt-4" message="شخص مشابهی یافت نشد!" type="info" />
        )}

        {data.status == -1 && (
          <Alert className="mt-4" message="در حال پردازش ..." type="info" />
        )}

        {data.status == 1 && (
          <>
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
                src={
                  process.env.NEXT_PUBLIC_API_URL + `${_face.blob.url}${face}`
                }
                alt="example"
              />
              <Descriptions title={`اطلاعات ${info.data?.Family || ""}`}>
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
              {Array.isArray(data.faces?.result) &&
                data.faces?.result.map((i) => (
                  <div
                    key={i.recognition_uid}
                    className="grid grid-cols-6 gap-5"
                  >
                    <Image
                      className="object-cover col-span-3 md:col-span-1 object-coverw-40 h-[177px] rounded-md bg-white"
                      width={500}
                      height={500}
                      src={
                        process.env.NEXT_PUBLIC_API_URL +
                        `${_recognition.download.url}${i.recognition_uid}`
                      }
                      alt="تصویر اصلی"
                    />
                    <div className="flex md:grid space-x-3 gap-3 grid-cols-5 border-primary border bg-primary bg-opacity-25 rounded p-2 col-span-3 md:col-span-5 overflow-y-hidden overflow-x-auto">
                      {i?.results?.map((r) => (
                        <div
                          key={r.face_uid}
                          onClick={() => setFace(r.face_uid)}
                          className="relative cursor-pointer min-w-36"
                        >
                          <span className="w-40 h-40 rounded-md relative cursor-pointer">
                            <Image
                              className="object-cover bg-white w-full h-full"
                              width={500}
                              height={500}
                              src={
                                process.env.NEXT_PUBLIC_API_URL +
                                `${_face.blob.url}${r.face_uid}`
                              }
                              alt={`${r.similarity}`}
                            />
                          </span>
                          <div className="absolute inset-0 flex items-end justify-center rounded-md bg-black bg-opacity-20 text-white">
                            شباهت: {r.similarity}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
