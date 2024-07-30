import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { _folder } from "../../constants/Folder";
import CustomRequest from "../../service/CustomRequest";
import { _face } from "../../constants/Face";

const { url, method, res, type } = _face.getAll;
type GetAllRes = z.infer<typeof res>;
type GetAllType = z.infer<typeof type>;

const useGetAll = (type: GetAllType) => {
  return useQuery({
    queryKey: [url, type],
    queryFn: (): Promise<GetAllRes> =>
      CustomRequest({ url, method, data: type, headers: { notify: false } }),
  });
};

export { useGetAll };
export type { GetAllRes, GetAllType };
