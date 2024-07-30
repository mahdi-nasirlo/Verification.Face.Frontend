import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { _folder } from "../../constants/Folder";
import CustomRequest from "../../service/CustomRequest";
import { _face } from "../../constants/Face";

const { url, method, res, type } = _face.getStatus;
type GetStatusRes = z.infer<typeof res>;
type GetStatusType = z.infer<typeof type>;

const useGetStatus = (type: GetStatusType) => {
  return useQuery({
    queryKey: [url, type],
    queryFn: (): Promise<GetStatusRes> =>
      CustomRequest({ url, method, data: type, headers: { notify: false } }),
    select: (data) => data?.[0],
  });
};

export { useGetStatus };
export type { GetStatusRes, GetStatusType };
