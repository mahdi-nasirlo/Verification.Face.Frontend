import { CardWrapper } from '@/root/src/components/CardWrappper';
import { FileWrapper } from '@/root/src/components/FileWrapper';
import { _face } from '@/root/src/constants/Face';
import { useDelete } from '@/root/src/hooks/Face/useDelete';
import { useGetAll as useGetAllFace } from '@/root/src/hooks/Face/useGetAll';
import { useGetAll } from '@/root/src/hooks/Folder/useGetAll';
import { Badge, Card, Col, Empty, Popconfirm, Row, Skeleton, Tag } from 'antd';
import { AnimatePresence, delay, motion } from 'framer-motion';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import React from 'react';

const { Meta } = Card;

export default function List({ parent_UID }: { parent_UID?: string | null }) {

    const faces = useGetAllFace({ parent_UID: parent_UID as string, need_Detail: true })

    const { data, isFetching } = useGetAll({ parent_UID: parent_UID })

    const router = useRouter()

    const MapCards = () => {

        const con = data?.length && data.length

        if (!con) {
            return
        }

        const len = data.length + (faces.data?.length || 0)

        let delay = len > 6 ? 0.05 : 0.3

        return <>
            {/* folder list */}
            {data?.map((i, index) => <CardWrapper key={index} slug={index} delay={delay}>
                <Card
                    onClick={() => router.push("/folder/" + i.Folder_UID)}
                    className='w-full h-full flex flex-col'
                    hoverable
                    cover={<Image className='p-6 bg-secondary object-contain w-full h-52' width={500} height={500} alt="example" src="/images/folder-icon.png" />}
                >
                    <Meta className='h-full' title={i.Folder_Name} description={<span className='w-full flex justify-between'><span>تاریخ ساخت:</span> <span dir='ltr' className='font-bold'>{i.Folder_Create_DT_Fa}</span></span>} />
                </Card>
            </CardWrapper>)}
            {/* folder list */}

            {/* image list */}
            {faces.data?.map((i, index) => <CardWrapper key={index} slug={index + data.length} delay={delay}>
                <Card
                    onClick={() => router.push("/inquiry/" + i.Face_UID)}
                    className='w-full h-full'
                    hoverable
                    cover={<div className='relative'>
                        <Image className='w-full object-cover h-52' width={500} height={500} src={process.env.NEXT_PUBLIC_API_URL + `${_face.blob.url}${i.Face_UID}?status=${i.Check_Status}`} alt='example' />
                    </div>}
                >
                    <Meta title={<>
                        <div className='gap-3 mb-2'>
                            <Tag color='blue-inverse' className='w-auto text-center'>
                                {`${i.Bio_Gender ? "مرد" : "زن"} ${i.Bio_Gender_Confidence > 0 ? i.Bio_Gender_Confidence + "%" : ""}`}
                            </Tag>
                            {i.Check_Status == 0 && <Tag color='gold-inverse' className='absolute top-12 left-2'>
                                در حال پردازش
                            </Tag>}
                            <Tag color='green-inverse'>
                                سن {i.Bio_Age_Confidence - 5} تا {i.Bio_Age_Confidence}
                            </Tag>
                        </div>
                        عکس {i.Name} {i.Family}
                    </>} description={<div className='space-x-3'>
                        <span className='w-full flex justify-between'>
                            <span>تاریخ ساخت:</span>
                            <span dir='ltr' className='font-bold'>{i.Face_Create_DT_Fa}</span>
                        </span>
                    </div>} />
                </Card>
            </CardWrapper>)}
            {/* image list */}
        </>
    }

    return (
        <>
            <AnimatePresence>
                <Row gutter={[25, 25]}>

                    <MapCards />

                    {/* loading list */}
                    {faces.isFetching || isFetching && Array.from({ length: 15 }).map((i, index) => <CardWrapper key={index} slug={index}>
                        <Card cover={<Skeleton.Image className='w-full h-[192px]' />}>
                            <Meta title={<Skeleton.Input />} />
                        </Card>
                    </CardWrapper>)}
                    {/* loading list */}

                    {/* empty section */}
                    {((!Array.isArray(data) || data?.length == 0) && (!Array.isArray(faces.data) || faces.data.length == 0)) && <Empty className='mx-auto' />}
                    {/* empty section */}

                </Row >
            </AnimatePresence>
        </>
    )
}



