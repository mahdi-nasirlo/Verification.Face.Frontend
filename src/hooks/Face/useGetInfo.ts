import { useQuery } from "@tanstack/react-query";
import React from "react";
import { _face } from "../../constants/Face";
import { z } from "zod";
import CustomRequest from "../../service/CustomRequest";

const { method, url, type, res } = _face.info;

type TTYpe = z.infer<typeof type>;
type TRes = z.infer<typeof res>;

export default function useGetInfo({ uid }: TTYpe) {
  return useQuery({
    queryKey: [url, uid],
    queryFn: (): Promise<TRes> => CustomRequest({ url: url + uid, method }),
    enabled: typeof uid == "string",
    select: (data) => data?.[0],
  });
}
