"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import BreadcrumbPage from '@/components/breadcrumb-page/breadcrumb-page'
import TableHeader from '@/components/table-header/table-header'
import { _Form_Property } from '@/constants/Form-Property'
import { Button, Col, ColProps, Form, Input, Select, Space, Switch, Table, TableColumnsType } from 'antd'
import { FolderKanban, LayoutPanelLeft, PencilLine, Plus, UserRoundCog, UserRoundSearch } from 'lucide-react'
import CreateModal from './create-modal'
import EditModal from './edit-modal'

export default function Page() {

    const [showFilter, setShowFilter] = useState<boolean>(false);

    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

    const [openEditModal, setOpenEditModal] = useState<string | undefined>(undefined);

    const colConfig: ColProps = {
        xs: 24,
        sm: 12,
        md: 8
    }


    const dataTest = [
        {
            row: 1,
            LName: "ادمین",
            last: "1402/12/15",
            is_active: true
        },
        {
            row: 2,
            LName: "کاربر",
            last: "1403/03/28",
            is_active: true
        }
    ]

    const columns: TableColumnsType<any> = [
        {
            key: "1",
            title: "ردیف",
            dataIndex: "row",
            width: "5%",
        },
        {
            key: "2",
            title: "عنوان",
            dataIndex: "LName",
        },
        {
            key: "3",
            title: "آخرین به روز رسانی",
            dataIndex: "last",
        },
        {
            key: "4",
            title: "وضعیت",
            dataIndex: "is_active",
            render(value, record) {
                return (
                    <Switch

                        checked={value}
                    />
                );
            },
        },
        {
            key: "5",
            title: "عملیات",
            width: "5%",
            dataIndex: "action",
            render: (value, record) => (
                <Space>
                    <Link href={`/role-determination/access-level/${record.row}`}>
                        <Button type="link" icon={<UserRoundSearch className="size-5" />}>
                            سطح دسترسی
                        </Button>
                    </Link>
                    <Button
                        type="link"
                        onClick={() => setOpenEditModal(record.row)}
                        icon={<PencilLine className="size-5" />}
                    >
                        ویرایش
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <BreadcrumbPage
            backLink="/dashboard"
            BreadcrumbList={[
                { label: "داشبورد", icon: LayoutPanelLeft, pathName: "/dashboard" },
                { label: "نقش ها", icon: UserRoundCog },
            ]}
        >
            <TableHeader
                title="لیست نقش ها"
                Icon={FolderKanban}
                actions={[
                    <Button
                        key={1}
                        type="primary"
                        icon={<Plus />}
                        className="w-full"
                        onClick={() => setOpenCreateModal(true)}
                    >
                        افزودن نقش
                    </Button>
                ]}
                filter={{
                    buttonFilter: {
                        status: showFilter,
                        setStatus: setShowFilter
                    },
                    formLoading: false,
                    // formLoading: persons.isLoading || persons.isFetching,
                    formOnFinish: (value: any) => console.log(value),
                    formChildren: <>
                        <Col {...colConfig}>
                            <Form.Item label="عنوان" name="fname">
                                <Input placeholder={_Form_Property.PlaceHolder.input} />
                            </Form.Item>
                        </Col>
                        <Col {...colConfig}>
                            <Form.Item label="وضعیت" name="isActive">
                                <Select
                                    options={[{ label: "فعال", value: true }, { label: "غیر فعال", value: false }]}
                                    placeholder={_Form_Property.PlaceHolder.select}
                                />
                            </Form.Item>
                        </Col>
                    </>
                }}
            />
            <Table
                bordered
                columns={columns}
                rowKey={(record) => record.row}
                dataSource={dataTest}
                scroll={{ x: 700 }}
                pagination={{ pageSize: 5 }}
            // loading={persons.isLoading || persons.isFetching}
            // pagination={persons.pagination}
            />
            <CreateModal open={openCreateModal} setOpen={setOpenCreateModal} />
            <EditModal open={openEditModal} setOpen={setOpenEditModal} />
        </BreadcrumbPage>
    )
}
