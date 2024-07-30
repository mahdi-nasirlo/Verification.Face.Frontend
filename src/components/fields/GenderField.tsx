import React from 'react'
import { Radio } from 'antd';

interface Props {
    value?: any;
    onChange?: (e: any) => void;
}

export default function GenderField({ value = {}, onChange }: Props) {

    const data = [
        { id: 0, label: "مرد", value: true },
        { id: 1, label: "زن", value: false }
    ]

    return (
        <Radio.Group
            onChange={onChange}
            value={value}
            optionType="button"
            defaultValue={false}
            buttonStyle="solid"
        >
            {data.map((item) =>
                <Radio.Button
                    key={item.id}
                    value={item.value}
                >
                    {item.label}
                </Radio.Button>
            )}
        </Radio.Group>
    )
}
