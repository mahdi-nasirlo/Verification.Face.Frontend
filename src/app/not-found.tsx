"use client"

import React from 'react'
import { Button, Card, theme, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import NotFoundPhoto from "../../public/images/404-error-connection.png";

export default function NotFound() {
    const { token: { colorBgContainer } } = theme.useToken();
    return (
        <div
            style={{ backgroundColor: colorBgContainer }}
            className="min-w-screen min-h-screen flex items-center justify-center"
        >
            <motion.div
                transition={{ duration: 0.35 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <Card className='max-sm:border-0 p-4'>
                    <div className='space-y-5'>
                        <Image
                            alt='404-error-connection'
                            src={NotFoundPhoto}
                            className='lg:w-[670px] lg:h-[420px] sm:w-[450px] sm:h-[270px] w-[230px] h-[150p]'
                        />
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <Typography className='text-base sm:text-lg'>
                                ! Can Not Find The Page
                            </Typography>
                            <Typography className='text-base sm:text-lg'>
                                صفحه ای پیدا نشد !
                            </Typography>
                        </div>
                        <div className='flex items-center justify-center'>
                            <Link href={"/dashboard"}>
                                <Button type='primary'>
                                    بازگشت به صفحه اصلی
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}
