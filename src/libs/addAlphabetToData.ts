interface Props<T> {
  data: T[] | undefined;
  keyName?: string;
  startFrom?: number;
}

export const addAlphabetToData = <T>({
  data,
  keyName = "row",
  startFrom = 1,
}: Props<T>) => {
  if (data)
    return data?.map((item: T, index: number) => {
      const alphabetChar = String.fromCharCode(97 + index + startFrom - 1);
      return {
        ...item,
        [keyName]: alphabetChar,
      };
    });
  return [];
};
