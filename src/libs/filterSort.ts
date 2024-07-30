import { Option } from "./filterOptions";

const filterSort = (optionA: Option, optionB: Option) => {
  const persianCollator = new Intl.Collator("fa");

  return persianCollator.compare(optionA.label, optionB.label);
};

export default filterSort;
