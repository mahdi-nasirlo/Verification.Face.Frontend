"use client"

import React from 'react'
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { theme } from 'antd';


export default function NextProgressBar() {

    const { token: { colorPrimary } } = theme.useToken();

    return (
        <ProgressBar
            height="4px"
            color={colorPrimary}
            options={{ showSpinner: false }}
            shallowRouting={false}
        />
    )
}
