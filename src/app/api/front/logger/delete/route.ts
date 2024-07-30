import { elasticClient } from "@/libs/logger/elasticClient";
import { ElasticsearchClientError } from "@elastic/transport/lib/errors";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // @ts-ignore
  const body = await request.json();

  if (!body?.name) {
    return NextResponse.json({
      success: false,
      message: "index name should not empty",
      data: null,
    });
  }

  try {
    const res = await elasticClient.indices.delete({ index: body.name });

    return NextResponse.json({
      success: true,
      id: body.id,
      data: res,
    });
  } catch (e: ElasticsearchClientError | any) {
    return NextResponse.json({
      success: false,
      message: "request field",
      data: e,
    });
  }
}
