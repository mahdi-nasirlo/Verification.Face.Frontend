"use client"

import React from 'react'
import BreadcrumbPage from '@/components/breadcrumb-page/breadcrumb-page'
import { useForm } from 'antd/es/form/Form'
import { Button, Card, Checkbox, Divider, Form, Typography } from 'antd'
import { LayoutPanelLeft, Save, UserRoundCog, UserRoundSearch } from 'lucide-react'

export default function Page() {

    const [form] = useForm();


    const accessList = [
        {
            key: "person",
            label: "اشخاص",
            children: [
                { name: "scan", label: "مشاهده لیست", value: true },
                { name: "status", label: "تغییر وضعیت", value: true },
                { name: "create", label: "افزودن شخص", value: true },
                { name: "view", label: "مشاهده هر شخص", value: false },
                { name: "edit", label: "ویرایش هر شخص", value: true },
                { name: "report", label: "گزارشات هر شخص", value: true },
                { name: "access", label: "تعیین نقش هر شخص", value: false },
            ]
        },
        {
            key: "company",
            label: "شرکت",
            children: [
                { name: "scan", label: "مشاهده لیست", value: true },
                { name: "status", label: "تغییر وضعیت", value: true },
                { name: "create", label: "افزودن شرکت", value: false },
                { name: "view", label: "مشاهده هر شرکت", value: true },
                { name: "edit", label: "ویرایش هر شرکت", value: true },
                { name: "report", label: "پروژه های هر شرکت", value: true },
            ]
        },
        {
            key: "project",
            label: "پروژه",
            children: [
                { name: "scan", label: "مشاهده لیست", value: false },
                { name: "status", label: "تغییر وضعیت", value: true },
                { name: "create", label: "افزودن پروژه", value: true },
                { name: "view", label: "مشاهده هر پروژه", value: false },
                { name: "edit", label: "ویرایش هر پروژه", value: false },
                { name: "report", label: "ورژن های هر پروژه", value: false },
            ]
        },
        {
            key: "reports",
            label: "گزارشات",
            children: [
                { name: "scan", label: "مشاهده لیست", value: true },
                { name: "weekly", label: "مشاهده گزارشات هفتگی", value: true },
                { name: "monthly", label: "مشاهده گزارشات ماهانه", value: true },
                { name: "system", label: "مشاهده گزارشات سامانه", value: true },
            ]
        },
        {
            key: "report-format",
            label: "قالب گزارشات",
            children: [
                { name: "scan", label: "مشاهده لیست", value: true },
                { name: "weekly", label: "دانلود قالب گزارشات", value: true },
                { name: "monthly", label: "بارگذاری قالب گزارشات", value: true },
            ]
        },
        {
            key: "archives",
            label: "بایگانی",
            children: [
                { name: "scan", label: "مشاهده لیست", value: false },
                { name: "create", label: "افزودن گزارش به بایگانی", value: false },
                { name: "view", label: " دانلود هر گزارش", value: true },
                { name: "edit", label: "حذف گزارش از بایگانی", value: false },
            ]
        }
    ]

    return (
        <BreadcrumbPage
            backLink="/role-determination"
            BreadcrumbList={[
                { label: "داشبورد", icon: LayoutPanelLeft, pathName: "/dashboard" },
                { label: "نقش ها", icon: UserRoundCog, pathName: "/role-determination" },
                { label: "سطح دسترسی نقش : ادمین", icon: UserRoundSearch },
            ]}
            actions={[
                <Button
                    type="primary"
                    key={"submit"}
                    icon={<Save className='size-5' />}
                    // loading={createCompanyUnit.isPending}
                    onClick={() => form.submit()}
                >
                    ذخیره
                </Button>
            ]}
        >
            <Form form={form}>
                <div className='grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4'>
                    {accessList.map((item) =>
                        <Card key={item.key}>
                            <Typography className='md:text-base font-semibold'>{item.label}</Typography>
                            <Divider />
                            {item.children.map((i, index) =>
                                <Form.Item key={index} name={i.name}>
                                    <Checkbox defaultChecked={i.value} className='gap-2'>
                                        {i.label}
                                    </Checkbox>
                                </Form.Item>
                            )}
                        </Card>
                    )}
                </div>
            </Form>
        </BreadcrumbPage>
    )
}
