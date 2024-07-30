import {} from "os";
import { useEffect, useState } from "react";

type TProps = {
  page?: number;
  pageSize?: number;
  disabled?: boolean;
  length?: number;
};

export default function usePagination(props?: TProps) {
  const [page, setPage] = useState(props?.page || 1);

  const [pageSize, setPageSize] = useState(props?.pageSize || 5);

  const onChange = (page: number, pageSize: number) => {
    if (page > 0) {
      setPage(page);
    }
    setPageSize(pageSize);
  };

  useEffect(() => {
    if (props?.length == 0) {
      onChange(page - 1, pageSize);
    }
  }, [page, pageSize, props?.length]);

  return {
    current: page,
    pageSize,
    onChange,
    disabled: props?.disabled || false,
  };
}
