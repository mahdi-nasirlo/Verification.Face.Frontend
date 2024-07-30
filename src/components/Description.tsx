import { theme } from 'antd'
import { LucideProps } from 'lucide-react'
import React, { HTMLProps } from 'react'

interface DescriptionsProps {
    children: React.ReactNode,
    className?: HTMLProps<HTMLElement>["className"]
}

export default function Descriptions(props: DescriptionsProps) {
    return (
        <div className={'bg-secondary flex p-5 rounded-md ' + props.className}>{props.children}</div>
    )
}


interface DescriptionItemProps {
    Icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    children: React.ReactNode,
    label: React.ReactNode,
    className?: HTMLProps<HTMLElement>["className"]
}

const DescriptionItem = ({ Icon, label, children, className }: DescriptionItemProps) => {

    const { token: { colorPrimary } } = theme.useToken()

    return <div className={'flex gap-3 ' + className}>
        <Icon color={colorPrimary} />
        <div className='flex flex-col gap-3'>
            <span className='text-slate-500 font-semibold text-base'>{label}</span>
            <span className='text-primary clear-start font-bold text-base'>{children}</span>
        </div>
    </div>
}

Descriptions.Item = DescriptionItem