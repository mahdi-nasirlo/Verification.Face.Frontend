"use client"

import React from 'react'
import { Button, Col, Divider, Modal, Row, Typography } from 'antd'
import { CircleAlert, Trash2, X } from 'lucide-react'

interface Props {
    title: string,
    loading: boolean
    open: string | undefined,
    setOpen: (arg: string | undefined) => void,
    handleDelete: () => void,
}

export default function DeleteModal({ title, loading, open, setOpen, handleDelete }: Props) {
    return (
        <Modal
            title={
                <div className='flex items-center gap-3'>
                    <CircleAlert className='size-5' />
                    <Typography className='text-base'>{`حذف ${title}`}</Typography>
                </div>
            }
            open={open as boolean | undefined}
            onCancel={() => setOpen(undefined)}
            footer={[
                <Row key={"box"} gutter={[8, 16]}>
                    <Col>
                        <Button
                            key={"cancel"}
                            disabled={loading}
                            icon={<X className='size-5' />}
                            onClick={() => setOpen(undefined)}
                        >
                            انصراف
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            danger
                            type="primary"
                            key={"submit"}
                            icon={<Trash2 className='size-5' />}
                            loading={loading}
                            onClick={handleDelete}
                        >
                            حذف
                        </Button>
                    </Col>
                </Row>
            ]}
        >
            <Divider />
            <Typography className='md:text-base'>آیا از حذف این {title} مطمئن هستید؟</Typography>
            <Divider />
        </Modal>
    )
}