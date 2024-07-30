import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { _folder } from "../../constants/Folder";
import CustomRequest from "../../service/CustomRequest";
import { _face } from "../../constants/Face";
import { _recognition } from "../../constants/Recognition";

const { url, method, res, type } = _recognition.getAll;
type GetAllRes = z.infer<typeof res>;
type GetAllType = z.infer<typeof type>;
type Recognition_Result = z.infer<typeof _recognition.Recognition_Result>;

const useGetAll = (type: GetAllType) => {
  return useQuery({
    queryKey: [url, type],
    queryFn: (): Promise<GetAllRes> =>
      CustomRequest({
        url,
        method,
        data: type,
        headers: { notify: false },
      }),
    select: (data) =>
      data.map((i) => ({
        ...i,
        Recognition_Result: JSON.parse(
          i.Recognition_Result
        ) as Recognition_Result,
      })),
  });
};

export { useGetAll };
export type { GetAllRes, GetAllType };
