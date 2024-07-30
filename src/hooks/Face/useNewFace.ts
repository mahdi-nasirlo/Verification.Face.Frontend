import { useMutation } from "@tanstack/react-query";
import { _face } from "../../constants/Face";
import CustomRequest from "../../service/CustomRequest";
import { z } from "zod";

const { method, type, url, res } = _face.newFace;

export type NewFaceType = z.infer<typeof type>;
type NewFaceRe = z.infer<typeof res>;

const useNewFace = () =>
  useMutation({
    mutationFn: (data: NewFaceType) => CustomRequest({ url, method, data }),
  });

export { useNewFace };
