"use client";

import { CardWrapper } from "@/root/src/components/CardWrappper";
import Title from "@/root/src/components/Title";
import BreadcrumbPage from "@/root/src/components/breadcrumb-page/breadcrumb-page";
import InputFilePond from "@/root/src/components/fields/input-file-pond";
import { _face } from "@/root/src/constants/Face";
import { _recognition } from "@/root/src/constants/Recognition";
import { useGetAll } from "@/root/src/hooks/Recognition/useGetAll";
import {
  NewSearchType,
  useNewSearch,
} from "@/root/src/hooks/Recognition/useNewSearch";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Flex,
  Form,
  Row,
  Select,
  Tag,
  Typography,
} from "antd";
import Meta from "antd/lib/card/Meta";
import { Loader, Upload } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import React from "react";
import SimilarImage from "./SimilarImage";
import { _Form_Property } from "@/root/src/constants/Form-Property";

export default function Client() {
  const router = useRouter();

  const { isPending, mutateAsync, data } = useNewSearch();

  const onFinish = async (data: any) => {
    const res = await mutateAsync(data);

    if (res) {
      router.push("/history");
    }
  };

  return (
    <>
      <div className="flex gap-5 flex-col">
        <Typography className="font-bold text-xl">جستجو</Typography>
        <Card title="آپلود تصویر">
          <div className="rounded-md p-2 md:p-5 flex flex-col gap-5">
            <Form disabled={isPending} onFinish={onFinish} layout="vertical">
              <Row gutter={[25, 25]}>
                <Col xs={24} md={6}>
                  <Form.Item<NewSearchType>
                    rules={[
                      { required: true, message: "آپلود تصویر اجباری است." },
                    ]}
                    name="image_Base64"
                  >
                    <InputFilePond
                      // acceptedFileTypes={["image/jpg"]}
                      maxFileSize="1MB"
                      allowFileEncode
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} className="flex flex-col gap-3">
                  <Form.Item label="جنسیت">
                    <Select />
                  </Form.Item>
                  <Form.Item label="رده سنی">
                    <Select />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Flex gap={10} justify="end">
                    <Button
                      loading={isPending}
                      disabled={isPending}
                      type="link"
                      // className="min-w-full lg:min-w-56"
                    >
                      انصراف
                    </Button>
                    <Button
                      loading={isPending}
                      disabled={isPending}
                      htmlType="submit"
                      type="primary"
                      // className="min-w-full lg:min-w-56"
                    >
                      ثبت
                    </Button>
                  </Flex>
                </Col>
              </Row>
            </Form>
          </div>
        </Card>
      </div>
      {/* {(data?.length || getAll.data?.length) && <div className='flex gap-5 flex-col mt-5'>
                    <div className='rounded-md p-5 flex flex-col gap-5'>
                        <Title icon={Upload}>
                            آپلود تصویر
                        </Title>
                        <Row gutter={[20, 20]}>
                            {(getAll.data)?.map((i, index) => {
                                return (<div className='w-full bg-secondary rounded-lg p-3 flex'>
                                    <Image className='object-cover h-52 w-52 rounded-md' width={500} height={500} src={process.env.NEXT_PUBLIC_API_URL + `${_recognition.download.url}${i.Recognition_UID}?status=${i.Status}`} alt='example' />
                                    <div className='bg-slate-300 w-[1px] mx-6'></div>
                                    <div>
                                        <div className='w-full mb-2'>
                                            <Title icon={Loader}>
                                                موارد مشابه
                                            </Title>
                                        </div>
                                        <Row gutter={[16, 16]}>
                                            {i.Recognition_Result.result.map(i => <SimilarImage item={i} />)}
                                        </Row>
                                    </div>
                                </div>)
                            })}
                        </Row>
                    </div>
                </div>} */}
    </>
  );
}
