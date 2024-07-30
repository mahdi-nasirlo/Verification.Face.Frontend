import { uuidv4 } from "@/utils/uuidv4";
import { Input, Tooltip } from "antd";
import { InputProps } from "antd/lib/input";
import { FileKey } from "lucide-react";
import React, { useState } from "react";

export const InputWithGuidMaker: React.FC<InputProps> = ({
  value = "",
  onChange,
  ...props
}) => {
  const [state, setState] = useState<string>();

  const triggerChange = (changedValue: React.ChangeEvent<HTMLInputElement>) => {
    setState(changedValue.target.value);
    // @ts-ignore
    onChange?.(changedValue.target?.value);
  };

  const changeValue = () => {
    const uuid = uuidv4();

    setState(uuid);

    // @ts-ignore
    onChange?.(uuid);
  };

  return (
    <Input
      {...props}
      type="text"
      value={(value as string) || state}
      addonAfter={
        <span
          onClick={changeValue}
          className="text-xs cursor-pointer flex items-center justify-between gap-1"
        >
          <Tooltip color="blue" title="مقدار دهی پیشفرض">
            <FileKey size={20} />
          </Tooltip>
        </span>
      }
      onChange={triggerChange}
    />
  );
};
export default InputWithGuidMaker;
