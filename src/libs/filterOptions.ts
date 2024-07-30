import { FilterFunc } from "rc-select/lib/Select";

export interface Option {
  value: string | number;
  label: string;
}

const filterOptions: FilterFunc<Option> = (inputValue, option) => {
  if (!inputValue) return true;
  if (!option) return false;
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};

export default filterOptions;
