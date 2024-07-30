import React from 'react';
import { Tag, TagProps } from 'antd';

interface Props {
    list?: {
        label: string;
        color: TagProps["color"];
        icon?: React.ReactElement;
    }[];
}

export default function StatusColumns({ list }: Props) {
    return (
        <>
            {list?.map((item, index) => {
                const { label, color, icon: Icon = <></> } = item;
                return (
                    <Tag key={index} color={color}>
                        <div className='flex items-center justify-center gap-2'>
                            {label}
                            {React.cloneElement(Icon, { className: 'md:size-5 size-4' })}
                        </div>
                    </Tag>
                );
            })}
        </>
    );
}
