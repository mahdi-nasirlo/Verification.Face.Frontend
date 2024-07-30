"use client";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "./primaryDatePicker.css";
import { Input, InputProps } from "antd";
import { Save } from "lucide-react";

const weekDays = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"]

type Props = {
    onChangeDate?: (value: string) => void;
    datePickerProps?: any;
    inputProps?: InputProps;
    onToday?: () => void;
    value?: Date | string;
    onChange?: any,
};

function CustomDatePickerW({
    onChangeDate,
    datePickerProps,
    inputProps,
    onToday,
    onChange,
    value,
}: Props) {
    const datePickerRef = useRef<any>(null);

    function onChangeHandler(date: any) {
        const miladiDate = new DateObject(date.toDate()).format("YYYY-MM-DD");

        onChange(miladiDate)
        console.log(miladiDate);

        // onChangeDate && onChangeDate(miladiDate) && onChange(miladiDate);
    }
    const [valueDate, setValueDate] = useState<Date | string | null>();

    useEffect(() => {
        setValueDate(value);
    }, [value]);

    return (
        <DatePicker
            {...(valueDate ? { value: new DateObject(valueDate) } : {})}
            weekDays={weekDays}
            ref={datePickerRef}
            offsetY={-30}
            portal
            minDate="1200/1/1"
            render={(value, openCalendar) => {
                return (
                    <Input
                        {...value && {
                            endAdornment: (
                                <div
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setValueDate(null);
                                        onChangeDate && onChangeDate("");
                                    }}
                                >
                                    <Save />
                                </div>
                            )
                        }}
                        value={value}
                        onClick={openCalendar}
                        {...inputProps}
                    />
                );
            }}
            onChange={onChangeHandler}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-left"
            className="primarydate"
            containerClassName="w-full"
            {...(datePickerProps || {})}
        />
    );
}

export default CustomDatePickerW;
