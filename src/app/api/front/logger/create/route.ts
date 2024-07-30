import { NextRequest, NextResponse } from "next/server";
import { ElasticsearchClientError } from "@elastic/transport/lib/errors";
import { elasticClient } from "@/libs/logger/elasticClient";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body?.name) {
      return NextResponse.json({
        success: false,
        message: "index name should not empty",
        data: null,
      });
    }

    const res = await elasticClient.indices.create({ index: body.name });

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
