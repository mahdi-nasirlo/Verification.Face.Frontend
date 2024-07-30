"use client"

import { Button, Card, Divider, Form, Row, Spin, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, X } from "lucide-react";

interface Props<T> {
    title: string;
    discretion?: React.ReactNode
    Icon?: React.ComponentType<{ className?: string | undefined }>;
    actions?: React.ReactNode[];
    filter?: {
        buttonFilter: {
            status: boolean
            setStatus: (arg: boolean) => void
        }
        formChildren: React.ReactNode
        formOnFinish: (value?: T) => void
        formLoading: boolean
    }
}

export default function TableHeader<T>({ title, discretion, Icon, actions, filter }: Props<T>) {

    const [form] = useForm()

    return (
        <>
            <div className={"flex w-full items-center justify-between max-md:block max-md:w-full max-md:space-y-2"}>
                <div className="mt-0.5 md:mt-1 lg:mt-1.5">
                    <div className="flex items-center">
                        {Icon && <Icon className="size-5" />}
                        <Typography
                            className="text-base font-semibold mr-2"
                        >
                            {title}
                        </Typography>
                    </div>
                    <Typography>{discretion}</Typography>
                </div>
                <div className="flex max-sm:flex-col-reverse gap-2">
                    {filter &&
                        <Button
                            key={1}
                            className="w-full"
                            icon={filter?.buttonFilter?.status ? <X /> : <Filter />}
                            danger={filter?.buttonFilter?.status}
                            onClick={() => filter?.buttonFilter?.setStatus(!filter.buttonFilter.status)}
                            loading={filter?.formLoading}
                            disabled={filter?.formLoading}
                        >
                            جستجو
                        </Button>
                    }
                    {actions?.map((item, index) =>
                        <div key={index} className="w-full">{item}</div>
                    )}
                </div>
            </div>
            <Divider />
            <div className="overflow-hidden">
                <AnimatePresence initial={false}>
                    {filter?.buttonFilter?.status &&
                        <>
                            <motion.div
                                exit={{ height: 0, opacity: 0 }}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                    height: "auto",
                                    opacity: 1,
                                    transition: {
                                        type: "just",
                                        bounce: 0.5,
                                        delay: 0.05,
                                    },
                                }}
                                transition={{
                                    duration: 0.4,
                                    type: "just",
                                    bounce: 0,
                                    delay: 0.02
                                }}
                            >
                                <Card>
                                    <div className="flex items-center gap-1 md:gap-2">
                                        <Filter className="size-5" />
                                        <Typography className="text-base">جستجو جدول</Typography>
                                    </div>
                                    <Divider />
                                    <Spin spinning={filter.formLoading}>
                                        <Form
                                            form={form}
                                            layout="vertical"
                                            onFinish={filter.formOnFinish}
                                        >
                                            <Row gutter={[16, 16]}>
                                                {filter.formChildren}
                                            </Row>
                                        </Form>
                                    </Spin>
                                    <div className="flex items-center justify-end mt-4 w-full">
                                        <div className="flex items-center justify-end gap-2 sm:w-1/6">
                                            <Button
                                                danger
                                                type="primary"
                                                className="w-full"
                                                onClick={async () => {
                                                    await form.resetFields()
                                                    await filter.formOnFinish()
                                                }}
                                                loading={filter.formLoading}
                                            >
                                                حذف فیلتر
                                            </Button>
                                            <Button
                                                type="primary"
                                                className="w-full"
                                                onClick={() => form.submit()}
                                                loading={filter.formLoading}
                                            >
                                                اعمال فیلتر
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                                <Divider />
                            </motion.div>
                        </>
                    }
                </AnimatePresence>
            </div>
        </>
    )
}
