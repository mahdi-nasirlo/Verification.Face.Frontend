import React from 'react'
import LayoutMain from '@/layouts/Index'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

interface Props {
    children: React.ReactNode
}

export const metadata: Metadata = {
    title: "سرویس تشخیص چهره",
};

export default async function Layout({ children }: Props) {

    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    return (
        <LayoutMain>
            {children}
        </LayoutMain>
    )
}
