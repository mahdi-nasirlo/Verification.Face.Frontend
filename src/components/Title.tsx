import { Typography } from 'antd'
import { LucideProps } from 'lucide-react'
import React, { HTMLProps } from 'react'

interface TProps {
    children: React.ReactNode,
    className?: HTMLProps<HTMLElement>["className"]
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>
}
export default function Title({ className, icon, children }: TProps) {

    const Icon = icon

    return (
        <div className={'flex items-center gap-3' + className}>
            <Icon className='size-5 text-secondary' />
            <Typography className='text-secondary text-base font-medium'>{children}</Typography>
        </div>)

}
