import { useMutation } from "@tanstack/react-query";
import { _authentication } from "../constants/Authentication";
import CustomRequest from "../service/CustomRequest";
import { z } from "zod";

const { url, method, type, res } = _authentication.login;

export type LoginType = z.infer<typeof type>;
export type LoginResponse = z.infer<typeof res>;

export default function useAuthentication() {
  return useMutation({
    mutationFn: (data: LoginType): Promise<LoginResponse> =>
      CustomRequest({ url, method, data }),
  });
}
