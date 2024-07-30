import Descriptions from "@/root/src/components/Description";
import { _Form_Property } from "@/root/src/constants/Form-Property";
import { NewFolderType, useNewFolder } from "@/root/src/hooks/Folder/useNewFolder";
import { Button, Col, Flex, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import moment from "jalali-moment";
import { Calendar, FolderInputIcon } from "lucide-react";
import { Variants, motion } from 'framer-motion';

export const descriptionVariant: Variants = {
    animate: {
        opacity: 1,
        y: 0
    },
    initial: {
        opacity: 0,
        y: 20
    }
}

export default function Add({ parent_UID, setTab }: { parent_UID?: string | null, setTab: React.Dispatch<React.SetStateAction<"list" | "add">> }) {

    const [form] = useForm()

    const { mutateAsync, isPending } = useNewFolder()

    const onFinish = async (data: NewFolderType) => {

        const res = await mutateAsync({ ...data, parent_UID })

        if (Array.isArray(res)) {
            form.resetFields()
            setTab("list")
        }

    }

    return (
        <div className="flex flex-col gap-4">
            <motion.div variants={descriptionVariant} initial="initial" animate="animate" transition={{ delay: 0.3, duration: 0.2 }}>
                <Descriptions className="flex gap-2 lg:gap-28">
                    <Descriptions.Item label={"نوع درخواست"} Icon={FolderInputIcon}>
                        افزودن پوشه جدید
                    </Descriptions.Item>
                    <Descriptions.Item className="hidden lg:block" label={"تاریخ ثبت درخواست"} Icon={Calendar}>
                        {moment().locale("fa").format('YYYY/MM/DD')}
                    </Descriptions.Item>
                    <Descriptions.Item label={"پوشه فعلی"} Icon={Calendar}>
                        روت اصلی
                    </Descriptions.Item>
                </Descriptions>
            </motion.div>
            <motion.div variants={descriptionVariant} initial="initial" animate="animate" transition={{ delay: 0.5, duration: 0.2 }}>
                <Form
                    form={form}
                    disabled={isPending}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Form.Item<NewFolderType>
                                name={"folder_Name"}
                                required={false}
                                rules={_Form_Property.rules({ label: "نام پوشه" }).defaultInput}
                                label="نام پوشه"
                            >
                                <Input placeholder={_Form_Property.PlaceHolder.input} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Flex gap={10} justify="end">
                                <Button loading={isPending} disabled={isPending} type="link" className="w-full lg:min-w-56">
                                    انصراف
                                </Button>
                                <Button loading={isPending} disabled={isPending} htmlType="submit" type="primary" className="w-full lg:min-w-56">
                                    ثبت
                                </Button>
                            </Flex>
                        </Col>
                    </Row>
                </Form>
            </motion.div>
        </div >
    )
}
