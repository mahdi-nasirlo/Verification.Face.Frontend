import baseAxios from "@/service/baseAxios";
import { handleSuccessStatus } from "@/utils/handleSuccess";
import { AxiosInstance } from "axios";

interface Props {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | string;
  axiosInstance?: AxiosInstance;
  params?: object;
  headers?: object;
  data?: any;
  notify?: boolean;
}

// const cookiesStore = cookies();

async function CustomRequest(props: Props) {
  const { url, method, notify, axiosInstance, params, data, headers } = props;

  const NewUrl = axiosInstance || baseAxios;

  const response = await NewUrl.request({
    url,
    headers,
    params,
    method,
    data,
  });
  // const response = await fetch(finalUrl, {
  //   method: method || "GET",
  //   cache: "no-cache",
  //   headers: {
  //     Accept: "application/json",
  //     Authorization: "Bearer " + authStore.getState().user?.token,
  //     "Content-Type": "application/json",
  //     ...headers,
  //   },
  //   body: JSON.stringify(data),
  // });

  const responseBody = await response.data;

  return responseBody;
}

export type { Props as customFetcherType };
export default CustomRequest;
