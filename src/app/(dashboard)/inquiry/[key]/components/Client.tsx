"use client"

import BreadcrumbPage from '@/root/src/components/breadcrumb-page/breadcrumb-page'
import { Button, Typography } from 'antd'
import { AnimatePresence } from 'framer-motion'
import { Calendar, CreditCardIcon, FolderInputIcon, FolderOpen, Image } from 'lucide-react'
import React, { useState } from 'react'
import Upload from '../../../upload/[key]/components/Upload'
import { motion } from 'framer-motion';
import { descriptionVariant } from '../../../folder/components/Add'
import Descriptions from '@/root/src/components/Description'
import moment from 'jalali-moment'
import { useGetStatus } from '@/root/src/hooks/Face/useGetStatus'

type tabType = "upload" | "inquiry"

export default function Client({ face_UID }: { face_UID: string }) {

    const [tab, setTab] = useState<tabType>("inquiry")

    const status = useGetStatus({ face_UID })

    return (
        <BreadcrumbPage>
            <div className='flex gap-5 flex-col'>
                <div className='flex gap-5 flex-col'>
                    <div className='flex gap-2 sticky'>
                        <Button onClick={() => setTab("inquiry")} type={tab == "upload" ? "default" : "primary"} icon={<CreditCardIcon />}>
                            استعلام داده ی بیومتریک
                        </Button>
                        <Button onClick={() => setTab("upload")} type={tab == "inquiry" ? "default" : "primary"} icon={<Image />}>
                            آپلود تصویر
                        </Button>
                    </div>
                </div>
                <AnimatePresence mode='wait'>
                    {tab == "upload" && <motion.div key={"upload"} transition={{ duration: 0.3 }} animate={{ x: 0, opacity: 1 }} initial={{ x: 60, opacity: 0 }} exit={{ x: -60, opacity: 0 }}>
                        <Upload folder_UID={"root"} />
                    </motion.div>}
                    {tab == "inquiry" && <motion.div key={"query"} transition={{ duration: 0.3 }} animate={{ x: 0, opacity: 1 }} initial={{ x: 60, opacity: 0 }} exit={{ x: -60, opacity: 0 }}>
                        <motion.div variants={descriptionVariant} initial="initial" animate="animate" transition={{ delay: 0.3, duration: 0.2 }}>
                            <Descriptions className="flex gap-28">
                                <Descriptions.Item label={"نوع درخواست"} Icon={FolderInputIcon}>
                                    افزودن پوشه جدید
                                </Descriptions.Item>
                                <Descriptions.Item className='hidden lg:block' label={"تاریخ ثبت درخواست"} Icon={Calendar}>
                                    {moment().locale("fa").format('YYYY/MM/DD')}
                                </Descriptions.Item>
                            </Descriptions>
                        </motion.div>
                    </motion.div>}
                    <motion.div variants={descriptionVariant} initial="initial" animate="animate" transition={{ delay: 0.5, duration: 0.2 }}>
                        {status.data?.Check_Status == -1 && <Typography className='text-center text-secondary w-full font-semibold text-2xl my-5'>در حال برسی ........</Typography>}
                    </motion.div>
                    <motion.div variants={descriptionVariant} initial="initial" animate="animate" transition={{ delay: 0.5, duration: 0.2 }}>
                        {status.data?.Check_Status == -1 && <Typography className='text-center text-secondary w-full font-semibold text-2xl my-5'>در حال برسی ........</Typography>}
                    </motion.div>
                </AnimatePresence>
            </div>
        </BreadcrumbPage>
    )
}
