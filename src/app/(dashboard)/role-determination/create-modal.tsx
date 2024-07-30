import React from 'react'
import { _Form_Property } from '@/constants/Form-Property'
import { useForm } from 'antd/es/form/Form'
import { Button, Col, Divider, Form, Input, Modal, Row, Spin, Typography } from 'antd'
import { Plus, Save, X } from 'lucide-react'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

export default function CreateModal({ open, setOpen }: Props) {

    const [form] = useForm()

    const onCancel = () => {
        setOpen(false);
        form.resetFields();
    }

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title={
                <div className='flex items-center gap-3'>
                    <Plus className='size-5' />
                    <Typography className='text-base'>افزودن نقش</Typography>
                </div>
            }
            footer={[
                <Row key={"box"} gutter={[8, 16]}>
                    <Col>
                        <Button
                            key={"cancel"}
                            // disabled={createCompanyUnit.isPending}
                            icon={<X className='size-5' />}
                            onClick={() => setOpen(false)}
                        >
                            انصراف
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            key={"submit"}
                            icon={<Save className='size-5' />}
                            // loading={createCompanyUnit.isPending}
                            onClick={() => form.submit()}
                        >
                            ذخیره
                        </Button>
                    </Col>
                </Row>
            ]}
        >
            <Divider />
            <Spin spinning={false}>
                <Form
                    form={form}
                    layout='vertical'
                // onFinish={async (value: TCreate) => {
                //     const res = await createCompanyUnit.mutateAsync({ ...value, companyid: parseInt(params.id) })
                //     if (res.isSuccess)
                //         onCancel()
                // }}
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24}>
                            <Form.Item label="عنوان" rules={_Form_Property.rules({ label: "عنوان" }).defaultInput}>
                                <Input placeholder={_Form_Property.PlaceHolder.input} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
            <Divider />
        </Modal>
    )
}