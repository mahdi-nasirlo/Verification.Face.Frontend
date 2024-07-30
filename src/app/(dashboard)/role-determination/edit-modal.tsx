import React from 'react'
import { _Form_Property } from '@/constants/Form-Property'
import { useForm } from 'antd/es/form/Form'
import { Button, Col, Divider, Form, Input, Modal, Row, Spin, Typography } from 'antd'
import { PencilLine, Save, X } from 'lucide-react'


interface Props {
    open: string | undefined
    setOpen: (open: string | undefined) => void
}

export default function EditModal({ open, setOpen }: Props) {
    const [form] = useForm()

    const onCancel = () => {
        setOpen(undefined);
        form.resetFields();
    }

    return (
        <Modal
            open={open as boolean | undefined}
            onCancel={onCancel}
            title={
                <div className='flex items-center gap-3'>
                    <PencilLine className='size-5' />
                    <Typography className='text-base'>ویرایش نقش</Typography>
                </div>
            }
            footer={[
                <Row key={"box"} gutter={[8, 16]}>
                    <Col>
                        <Button
                            key={"cancel"}
                            // disabled={createCompanyUnit.isPending}
                            icon={<X className='size-5' />}
                            onClick={() => setOpen(undefined)}
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