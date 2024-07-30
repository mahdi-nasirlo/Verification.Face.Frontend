import React from 'react'
import { Column, ColumnConfig } from '@ant-design/plots';
import { Card, Divider, Spin, theme } from 'antd';
import useThemeMode from '@/components/mode-toggle/use-theme-mode';


export default function DemoColumnCharts() {

    const { token: { colorPrimary, colorBorder, colorText } } = theme.useToken()

    const { mode } = useThemeMode();


    const config: ColumnConfig = {
        axis: {
            x: {
                labelFontFamily: "IRANSansfanum"
            },
            y: {
                labelFontFamily: "IRANSansfanum"
            },
        },
        theme: mode == "dark" ? "classicDark" : "classic",
        legend: {
            color: {
                itemLabelFill: colorText,
                itemLabelFontFamily: "IRANSansfanum",
                position: 'top',
                layout: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                },
            },
        },
        loading: false,
        loadingTemplate: <Spin />,
        containerStyle: { direction: "ltr", fontFamily: "IRANSansfanum" },
        data: dataTest,
        xField: "month",
        yField: "value",
        colorField: 'name',
        group: true,
        // style: {
        //     fill: (data: dataTestProps) => {
        //         if (data.name === 'بارگذاری شده') {
        //             return colorBorder;
        //         }
        //         return colorPrimary;
        //     },
        // },
        interaction: {
            tooltip: {
                render: (e: React.MouseEvent, { title, items, index }: { title: string, items: { name: string, value: number, color: string }[], index: number }) => {
                    return (
                        <div dir='rtl' key={index} style={{ fontFamily: "IRANSansfanum", color: colorText }}>
                            <div className='flex justify-center lg:text-base'>ماه {title}</div>
                            <Divider style={{ borderColor: colorBorder }} className='my-1' />
                            {items.map((item, index) => {
                                const { name, value, color } = item;
                                return (
                                    <div key={index} style={{ color: colorText }}>
                                        <div className='flex items-center justify-between lg:text-base gap-2'>
                                            <div className='flex justify-center items-center gap-2'>
                                                <span
                                                    className='inline-block size-2 rounded-full'
                                                    style={{ backgroundColor: color }}
                                                ></span>
                                                <span>{name}</span>
                                            </div>
                                            <b>{value}</b>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                },
            },
        },
    };

    return (
        <Card>
            <Column  {...config} />
        </Card >
    )
}

type dataTestProps = {
    name: string
    month: string,
    value: number
}

const dataTest: dataTestProps[] = [
    {
        name: "بارگذاری شده",
        month: "فروردین",
        value: 30
    },
    {
        name: "تایید شده",
        month: "فروردین",
        value: 23
    },
    {
        name: "بارگذاری شده",
        month: "اردیبهشت",
        value: 42
    },
    {
        name: "تایید شده",
        month: "اردیبهشت",
        value: 25
    },
    {
        name: "بارگذاری شده",
        month: "خرداد",
        value: 12
    },
    {
        name: "تایید شده",
        month: "خرداد",
        value: 6
    },
    {
        name: "بارگذاری شده",
        month: "تیر",
        value: 45
    },
    {
        name: "تایید شده",
        month: "تیر",
        value: 45
    },
    {
        name: "بارگذاری شده",
        month: "مرداد",
        value: 30
    },
    {
        name: "تایید شده",
        month: "مرداد",
        value: 29
    },
    {
        name: "بارگذاری شده",
        month: "شهریور",
        value: 28
    },
    {
        name: "تایید شده",
        month: "شهریور",
        value: 10
    },
    {
        name: "بارگذاری شده",
        month: "مهر",
        value: 30
    },
    {
        name: "تایید شده",
        month: "مهر",
        value: 23
    },
    {
        name: "بارگذاری شده",
        month: "آبان",
        value: 42
    },
    {
        name: "تایید شده",
        month: "آبان",
        value: 25
    },
    {
        name: "بارگذاری شده",
        month: "آذر",
        value: 12
    },
    {
        name: "تایید شده",
        month: "آذر",
        value: 6
    },
    {
        name: "بارگذاری شده",
        month: "دی",
        value: 45
    },
    {
        name: "تایید شده",
        month: "دی",
        value: 45
    },
    {
        name: "بارگذاری شده",
        month: "بهمن",
        value: 30
    },
    {
        name: "تایید شده",
        month: "بهمن",
        value: 29
    },
    {
        name: "بارگذاری شده",
        month: "استفند",
        value: 28
    },
    {
        name: "تایید شده",
        month: "استفند",
        value: 10
    },
]