import { z } from "zod";

const _authentication = {
  login: {
    url: "/authentication/authenticate",
    method: "POST",
    type: z.object({
      userName: z.string(),
      password: z.string(),
    }),
    res: z.string(),
  },
};

export { _authentication };
