import { useMutation, useQueryClient } from "@tanstack/react-query";
import { _face } from "../../constants/Face";
import CustomRequest from "../../service/CustomRequest";
import { z } from "zod";

const { method, type, url } = _face.delete;

export type NewFaceType = z.infer<typeof type>;

const useDelete = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: (data: NewFaceType) => CustomRequest({ url, method, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [_face.getAll.url],
        exact: false,
      });
    },
  });

  return { ...query };
};

export { useDelete };
