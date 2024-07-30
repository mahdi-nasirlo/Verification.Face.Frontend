import { elasticClient } from "@/libs/logger/elasticClient";
import { NextRequest, NextResponse } from "next/server";
import { ElasticsearchClientError } from "@elastic/transport/lib/errors";

export async function GET(request: NextRequest) {
  try {
    try {
      const del = await elasticClient.indices.delete({
        index: process.env.ELASTIC_INDEX_NAME,
      });

      const create = await elasticClient.indices.create({
        index: process.env.ELASTIC_INDEX_NAME,
      });

      return NextResponse.json({
        success: true,
        data: create,
      });
    } catch (e: ElasticsearchClientError | any) {
      if (e?.meta.statusCode === 404) {
        const create = await elasticClient.indices.create({
          index: process.env.ELASTIC_INDEX_NAME,
        });

        return NextResponse.json({
          success: true,
          data: create,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: null,
    });
  } catch (e: ElasticsearchClientError | any) {
    return NextResponse.json({
      success: false,
      message: "request field",
      data: e,
    });
  }
}
