import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { _folder } from "../../constants/Folder";
import CustomRequest from "../../service/CustomRequest";

const { url, method, res, data } = _folder.getParent;
type GetParentRes = z.infer<typeof res>;
type GetParentType = z.infer<typeof data>;

const useGetParent = (type: GetParentType) => {
  return useQuery({
    queryKey: [url, type],
    queryFn: (): Promise<GetParentRes> =>
      CustomRequest({ url, method, data: type, headers: { notify: false } }),
  });
};

export { useGetParent };
export type { GetParentRes, GetParentType };
