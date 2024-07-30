"use client"

import BreadcrumbPage from '@/root/src/components/breadcrumb-page/breadcrumb-page'
import { Button } from 'antd'
import { AnimatePresence } from 'framer-motion'
import { CreditCard, CreditCardIcon, Image } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import Upload from './Upload'
import { useRouter } from 'next-nprogress-bar'
import { changeTabVariant } from '@/root/src/utils/variants'
import List from '../../../folder/components/List'

type tabType = "upload" | "list"

export default function Client({ folder_UID }: { folder_UID: string }) {

    const [tab, setTab] = useState<tabType>("upload")

    const router = useRouter()

    return (
        <BreadcrumbPage>
            <div className='flex gap-5 flex-col'>
                <div className='flex gap-2 sticky'>
                    <Button onClick={() => setTab("upload")} type={tab == "list" ? "default" : "primary"} icon={<Image />}>
                        آپلود تصویر
                    </Button>
                    <Button onClick={() => setTab("list")} type={tab == "upload" ? "default" : "primary"} icon={<CreditCard />}>
                        لیست پوشه ها
                    </Button>
                </div>
                <AnimatePresence mode='wait'>
                    {tab == "upload" && <motion.div key={"upload"} transition={{ duration: 0.3 }} animate={{ x: 0, opacity: 1 }} initial={{ x: 60, opacity: 0 }} exit={{ x: -60, opacity: 0 }}>
                        <Upload folder_UID={folder_UID} />
                    </motion.div>}
                    {tab == "list" && <motion.div key={"query"} transition={{ duration: 0.3 }} animate={{ x: 0, opacity: 1 }} initial={{ x: 60, opacity: 0 }} exit={{ x: -60, opacity: 0 }}>
                        {tab == "list" && <motion.div
                            key={"list"}
                            variants={changeTabVariant}
                            animate="animation"
                            initial="initial"
                            exit="exit"
                        >
                            <List parent_UID={undefined} />
                        </motion.div>}
                    </motion.div>}
                </AnimatePresence>
            </div>
        </BreadcrumbPage>
    )
}
