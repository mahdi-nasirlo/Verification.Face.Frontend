import { TPage } from "@/types/responseType";

interface Props<T> {
  data: T[] | undefined;
  keyName?: string;
  pageData?: TPage;
  totalCount?: number;
}

export const addIndexToData = <T>({
  data,
  keyName = "row",
  pageData,
  totalCount,
}: Props<T>) => {
  if (data) {
    const pageNumber = pageData?.pagenumber || 1;
    const pageSize = pageData?.pagesize || 5;
    const startIndex = (pageNumber - 1) * pageSize + 1;

    const value = data.map((item: T, index: number) => {
      return {
        ...item,
        [keyName]: startIndex + index,
      };
    });

    return { value, totalCount };
  }

  return { value: [], totalCount: undefined };
};
