import Descriptions from "@/root/src/components/Description";
import { _Form_Property } from "@/root/src/constants/Form-Property";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";
import { motion } from "framer-motion";
import moment from "jalali-moment";
import {
  Calendar,
  Fingerprint,
  FolderInputIcon,
  FolderOpen,
  MapPin,
  Save,
} from "lucide-react";
import { NewFaceType, useNewFace } from "@/root/src/hooks/Face/useNewFace";
import { useRouter } from "next-nprogress-bar";
import InputWithGuidMaker from "@/root/src/components/fields/InputWithGuidMaker";
import { descriptionVariant } from "../../../folder/components/Add";
import InputFilePond from "@/root/src/components/fields/input-file-pond";
import Title from "@/root/src/components/Title";

export default function Upload({
  folder_UID,
}: {
  folder_UID: string | "root";
}) {
  const router = useRouter();

  const { mutateAsync, isPending } = useNewFace();

  const onFinish = async (data: any) => {
    const res = await mutateAsync({
      ...data,
      parent_UID: folder_UID == "root" ? null : folder_UID,
    });
    if (res) {
      router.push("/folder/" + folder_UID);
    }
  };

  return (
    <Form
      disabled={isPending}
      onFinish={onFinish}
      className="flex flex-col gap-6"
      layout="vertical"
    >
      <motion.div
        variants={descriptionVariant}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5, duration: 0.2 }}
      >
        <Card title="فایل تصویر">
          <Row gutter={[20, 20]}>
            <Col xs={24} md={12} lg={10}>
              <Form.Item<NewFaceType>
                rules={[{ required: true, message: "آپلود تصویر اجباری است." }]}
                name="face_Image_Data_Base64"
              >
                <InputFilePond maxFileSize="1MB" required allowFileEncode />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item<NewFaceType>
                name="image_Storage_Status"
                rules={
                  _Form_Property.rules({
                    label: "نوع ذخیره سازی",
                    required: true,
                  }).defaultInputNumber
                }
              >
                <Radio.Group className="h-fit pb-3" defaultValue={1}>
                  <Radio value={1} className="w-full">
                    درخواست ذخیره و استخراج عکس مطابق با اندازه استاندارد را
                    دارم .
                  </Radio>
                  <Radio value={2} className="mt-3 w-full">
                    درخواست ذخیره و استخراج عکس مطابق با اندازه آپلود شده را
                    دارم .
                  </Radio>
                </Radio.Group>
                {/* <Radio.Group className="h-full flex flex-col items-start">
                  <Radio value={1}>
                    درخواست ذخیره و استخراج عکس مطابق با اندازه استاندارد را
                    دارم .
                  </Radio>
                  <Radio value={2} className="mt-8">
                    درخواست ذخیره و استخراج عکس مطابق با اندازه آپلود شده را
                    دارم .
                  </Radio>
                </Radio.Group> */}
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </motion.div>

      <motion.div
        variants={descriptionVariant}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.8, duration: 0.2 }}
      >
        <Card title="اطلاعات تصویر">
          <Row gutter={[20, 20]}>
            <Col xs={24} md={12}>
              <Form.Item<NewFaceType>
                rules={
                  _Form_Property.rules({
                    label: "شناسه ملی",
                    required: false,
                  }).defaultInput
                }
                name="name"
                label="نام"
              >
                <Input placeholder={_Form_Property.PlaceHolder.input} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item<NewFaceType>
                rules={
                  _Form_Property.rules({
                    label: "شناسه ملی",
                    required: false,
                  }).defaultInput
                }
                name="family"
                label="نام خانوادگی"
              >
                <Input placeholder={_Form_Property.PlaceHolder.input} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item<NewFaceType>
                required={false}
                rules={
                  _Form_Property.rules({
                    label: "شناسه ملی",
                    required: false,
                  }).nationalCode
                }
                name="code_Melli"
                label="شناسه ملی"
              >
                <Input placeholder={_Form_Property.PlaceHolder.input} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </motion.div>

      <motion.div
        variants={descriptionVariant}
        initial="initial"
        animate="animate"
        transition={{ delay: 1, duration: 0.2 }}
      >
        <Card title="شناسه تصویر">
          <Row gutter={[20, 20]}>
            <Col xs={24} md={12}>
              <Form.Item<NewFaceType>
                required={false}
                rules={
                  _Form_Property.rules({
                    label: "شناسه GUID",
                    required: false,
                  }).defaultInput
                }
                name="code_GUID"
                label="شناسه GUID"
              >
                <InputWithGuidMaker
                  placeholder={_Form_Property.PlaceHolder.input}
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item<NewFaceType>
                required={false}
                rules={
                  _Form_Property.rules({
                    label: "شناسه انحصاری",
                    required: false,
                  }).defaultInputNumber
                }
                name="code_ID"
                label="شناسه انحصاری"
              >
                <Input
                  type="number"
                  placeholder={_Form_Property.PlaceHolder.input}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item<NewFaceType>
                required={false}
                rules={
                  _Form_Property.rules({
                    label: "شناسه کلیدی",
                    required: false,
                  }).defaultInput
                }
                name="code_Keyword"
                label="شناسه کلیدی"
              >
                <Input placeholder={_Form_Property.PlaceHolder.input} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Flex gap={10} justify="end">
                <Button
                  loading={isPending}
                  disabled={isPending}
                  type="link"
                  className="w-full lg:min-w-56"
                >
                  انصراف
                </Button>
                <Button
                  loading={isPending}
                  disabled={isPending}
                  htmlType="submit"
                  type="primary"
                  className="w-full lg:min-w-56"
                >
                  ثبت
                </Button>
              </Flex>
            </Col>
          </Row>
        </Card>
      </motion.div>
    </Form>
  );
}
