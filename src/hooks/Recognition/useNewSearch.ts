import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { _folder } from "../../constants/Folder";
import CustomRequest from "../../service/CustomRequest";
import { _recognition } from "../../constants/Recognition";

const { url, method, type, res } = _recognition.search;
type NewSearchRes = z.infer<typeof res>;
type NewSearchType = z.infer<typeof type>;

const useNewSearch = () => {
  //   const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: NewSearchType): Promise<NewSearchRes> =>
      CustomRequest({ url, method, data }),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: [_folder.getAll.url],
    //     exact: false,
    //   });
    // },
  });

  return { ...query };
};

export { useNewSearch };
export type { NewSearchType };
