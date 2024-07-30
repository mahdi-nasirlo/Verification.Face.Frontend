import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { _folder } from "../../constants/Folder";
import CustomRequest from "../../service/CustomRequest";

const { url, method, data, res } = _folder.new;
type NewFolderRes = z.infer<typeof res>;
type NewFolderType = z.infer<typeof data>;

const useNewFolder = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: NewFolderType): Promise<NewFolderRes> =>
      CustomRequest({ url, method, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [_folder.getAll.url],
        exact: false,
      });
    },
  });

  return { ...query };
};

export { useNewFolder };
export type { NewFolderType };
