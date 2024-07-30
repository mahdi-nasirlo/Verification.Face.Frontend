import React from 'react'
import { Form, Button, Empty } from 'antd'
import CustomDatePickerW from './fields/CustomDatePickerW/CustomDatePickerW'

export default function TestDatePicker() {
    return (
        <div>
            <div className="w-full flex flex-col items-center">
                <span>Jalali DatePicker in Farsi</span>
                <Form onFinish={(value) => console.log(value)}>
                    <Form.Item name={"test"} label="dsds">
                        <CustomDatePickerW />
                    </Form.Item>
                    <Button htmlType="submit">ttst</Button>
                </Form>
                <Empty />
            </div>
        </div>
    )
}
