import { _face } from '@/root/src/constants/Face'
import useGetInfo from '@/root/src/hooks/Face/useGetInfo'
import Image from 'next/image'
import React from 'react'

interface TProps {
    Face_UID: string
}

export default function SimilarResult({ Face_UID }: TProps) {

    const { data } = useGetInfo({ uid: Face_UID })

    return (
        <div>
            <Image className='object-cover h-full rounded-md' width={500} height={500} src={process.env.NEXT_PUBLIC_API_URL + `${_face.blob.url}${Face_UID}`} alt='example' />

        </div>
    )
}
