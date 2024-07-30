"use client";

import StateLoading from "@/components/ProtectedLoading";
import {
  baseAxiosRequestInterceptor,
  baseAxiosResponseInterceptor,
} from "@/service/baseAxios";
import useNotification from "antd/es/notification/useNotification";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface TProps {
  children: React.ReactNode;
}

interface TUser {
  token: string;
}

export default function ProtectedRoute(props: TProps) {
  const [notification, holder] = useNotification();

  const session = useSession();

  const user = session.data?.user as TUser;

  const [responseInterceptorSet, setResponseInterceptorSet] = useState(false);

  useEffect(() => {
    if (responseInterceptorSet) {
      baseAxiosResponseInterceptor(notification);
    }
    setResponseInterceptorSet(true);
  }, [responseInterceptorSet]);

  if (session.status == "loading") {
    return <StateLoading />;
  }

  baseAxiosRequestInterceptor(user, notification);

  return (
    <>
      {props.children}
      {holder}
    </>
  );
}
