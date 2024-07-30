import { TResponse } from "@/types/responseType";
import { getErrorMessage } from "@/utils/handleMessage";
import { NotificationInstance } from "antd/es/notification/interface";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { signOut } from "next-auth/react";

const baseAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    Accept: "*/*",
    notify: true,
    "Content-Type": "application/json",
  },
});

const baseAxiosResponseInterceptor = (notification: NotificationInstance) => {
  baseAxios.interceptors.response.use(
    (res: AxiosResponse<TResponse<{}>>) => {
      const method = res.config.method;

      if (method !== "get" && method !== "head") {
        if (
          res.status >= 200 &&
          res.status < 300 &&
          res.config.headers.notify
        ) {
          notification.success({
            message: res.data.responseMessage || "عملیات با موفقیت انجام شد.",
          });

          return res;
        }

        if (res.status >= 300) {
          notification.error({
            message: getErrorMessage(res.status),
          });
        }

        return res;
      }

      if (res.status >= 300) {
        notification.error({
          message: getErrorMessage(res.status),
        });

        return res;
      }

      return res;
    },
    function (error: AxiosError<TResponse<{}>>) {
      const status = error.response?.status;

      if (status == 401 || status == 403) {
        signOut({ redirect: true });
      }

      notification.error({
        message:
          getErrorMessage(error?.response?.status) ||
          `خطایی رخ داده است ${error.message}`,
      });
      return Promise.reject(error);
    }
  );
};

const baseAxiosRequestInterceptor = (
  user: { token: string },
  notification: NotificationInstance
) => {
  baseAxios.interceptors.request.use(
    (conf) => {
      conf.headers["Authorization"] = "Bearer " + user?.token;
      return conf;
    },
    (err) => {
      console.log(err);
      notification.error({ message: "خطای سیستمی رخ داده است." });
    }
  );
};

export { baseAxiosRequestInterceptor, baseAxiosResponseInterceptor };
export default baseAxios;
