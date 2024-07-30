import Descriptions from '@/root/src/components/Description';
import { _Form_Property } from '@/root/src/constants/Form-Property';
import { Button, Col, Flex, Form, Input, InputNumber, Radio, Row, Typography } from 'antd';
import { motion } from 'framer-motion';
import moment from 'jalali-moment';
import { Calendar, Fingerprint, FolderInputIcon, FolderOpen, MapPin, Save } from 'lucide-react';
import { NewFaceType, useNewFace } from '@/root/src/hooks/Face/useNewFace';
import { useRouter } from 'next-nprogress-bar';
import InputWithGuidMaker from '@/root/src/components/fields/InputWithGuidMaker';
import { descriptionVariant } from '../../../folder/components/Add';
import InputFilePond from '@/root/src/components/fields/input-file-pond';

export default function Upload({ folder_UID }: { folder_UID: string | "root" }) {

    const router = useRouter()

    const { mutateAsync, isPending } = useNewFace()

    const onFinish = async (data: any) => {

        const res = await mutateAsync({ ...data, parent_UID: folder_UID == "root" ? null : folder_UID, })

        if (res) {
            router.push("/folder/" + folder_UID)
        }

    }

    return (
        <div className="flex flex-col gap-6">
            <motion.div variants={descriptionVariant} initial="initial" animate="animate" transition={{ delay: 0.3, duration: 0.2 }}>
                <Descriptions className="flex gap-2 lg:gap-28">
                    <Descriptions.Item className='' label={"نوع درخواست"} Icon={FolderInputIcon}>
                        افزودن پوشه جدید
                    </Descriptions.Item>
                    <Descriptions.Item className='hidden lg:block' label={"تاریخ ثبت درخواست"} Icon={Calendar}>
                        {moment().locale("fa").format('YYYY/MM/DD')}
                    </Descriptions.Item>
                    <Descriptions.Item className='hidden lg:block' label={"شناسه یکتای پوشه"} Icon={FolderOpen}>
                        {folder_UID}
                    </Descriptions.Item>
                </Descriptions>
            </motion.div>
            <motion.div variants={descriptionVariant} initial="initial" animate="animate" transition={{ delay: 0.5, duration: 0.2 }}>
                <Form onFinish={onFinish} className='flex flex-col gap-6' layout='vertical'>
                    <div className='flex items-center gap-3'>
                        <Save className='size-5 text-secondary' />
                        <Typography className='text-secondary text-base font-medium'>ذخیره تصویر</Typography>
                    </div>
                    <div>
                        <Row gutter={[20, 20]}>
                            <Col xs={24} md={6}>
                                <Form.Item<NewFaceType> name="face_Image_Data_Base64">
                                    <InputFilePond maxFileSize="1MB" allowFileEncode />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={18} className=''>
                                <Form.Item<NewFaceType> className='h-full flex pt-5'>
                                    <Radio.Group className='h-full flex flex-col items-start'>
                                        <Radio value={1}>درخواست ذخیره و  استخراج عکس مطابق با اندازه استاندارد را دارم .</Radio>
                                        <Radio value={2} className='mt-8'>درخواست ذخیره و استخراج عکس مطابق با اندازه آپلود شده را دارم .</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <div className='flex items-center gap-3 mt-10 lg:mt-1'>
                        <MapPin className='size-5 text-secondary' />
                        <Typography className='text-secondary text-base font-medium'>ثبت مشخصات مربوط به عکس</Typography>
                    </div>
                    <div>
                        <Row gutter={[20, 20]}>
                            <Col xs={24} md={12}>
                                <Form.Item<NewFaceType> rules={_Form_Property.rules({ label: "شناسه ملی", required: false }).defaultInput} name="name" label="نام">
                                    <Input placeholder={_Form_Property.PlaceHolder.input} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item<NewFaceType> rules={_Form_Property.rules({ label: "شناسه ملی", required: false }).defaultInput} name="family" label="نام خانوادگی">
                                    <Input placeholder={_Form_Property.PlaceHolder.input} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item<NewFaceType> required={false} rules={_Form_Property.rules({ label: "شناسه ملی", required: false }).nationalCode} name="code_Melli" label="شناسه ملی">
                                    <Input placeholder={_Form_Property.PlaceHolder.input} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <div className='flex items-center gap-3 my-3'>
                                    <Fingerprint className='size-5 text-secondary' />
                                    <Typography className='text-secondary text-base font-medium'>ثبت شناسه های عکس</Typography>
                                </div>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item<NewFaceType> required={false} rules={_Form_Property.rules({ label: "شناسه GUID", required: false }).defaultInput} name="code_GUID" label="شناسه GUID">
                                    <InputWithGuidMaker placeholder={_Form_Property.PlaceHolder.input} readOnly />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item<NewFaceType> required={false} rules={_Form_Property.rules({ label: "شناسه انحصاری", required: false }).defaultInputNumber} name="code_ID" label="شناسه انحصاری">
                                    <Input type='number' placeholder={_Form_Property.PlaceHolder.input} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item<NewFaceType> required={false} rules={_Form_Property.rules({ label: "شناسه کلیدی", required: false }).defaultInput} name="code_Keyword" label="شناسه کلیدی">
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
                    </div>
                </Form>
            </motion.div>
        </div>
    )
}
