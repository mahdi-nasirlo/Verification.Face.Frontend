import { _face } from "@/root/src/constants/Face";
import { _recognition } from "@/root/src/constants/Recognition";
import { Col, Row } from "antd";
import Image from "next/image";
import React from "react";
import SimilarResult from "./SimilarResult";

interface TProps {
  item: {
    recognition_uid: string;
    results: {
      face_uid: string;
      similarity: number;
    }[];
  };
}

export default function SimilarImage({ item }: TProps) {
  return (
    <Row gutter={[16, 16]}>
      {/* <Col span={4}>
                <Image className='object-cover rounded-md' width={500} height={500} src={process.env.NEXT_PUBLIC_API_URL + `${_face.blob.url}${item.recognition_uid}`} alt='example' />
            </Col>
            {item.results.map(i =>
                <Col span={4}>
                    <SimilarResult Face_UID={i.face_uid} />
                </Col>
            )} */}
    </Row>
  );
}
