import {
  EmailAddress,
  NationalCode,
  PhoneCellular,
  PhoneLandline,
  setPassword,
  setUserName,
} from "@/libs/validate";
import { RuleObject } from "antd/es/form";
import { NamePath } from "antd/es/form/interface";

interface RuleProps {
  label: string;
  nextLabel?: string;
  name?: string;
  required?: boolean;
}

const _Form_Property = {
  PlaceHolder: {
    input: "مقدار را وارد کنید",
    inputNumber: "عدد را وارد کنید",
    textArea: "مقدار را وارد کنید",
    datePicker: "تاریخ را انتخاب کنید",
    select: "مقدار را انتخاب کنید",
  },
  rules: ({ label, name, nextLabel, required = true }: RuleProps) => ({
    defaultInput: [
      { required, message: errorMessage({ label: label }).required },
      {
        max: 50,
        message: errorMessage({ label: label, value: 50 }).maxCharacter,
      },
      {
        min: 3,
        message: errorMessage({ label: label, value: 3 }).minCharacter,
      },
    ],
    defaultInputNumber: [
      { required, message: errorMessage({ label: label }).required },
      {
        validator(
          rule: RuleObject,
          value: any,
          callback: (error?: string) => void
        ) {
          if (value && !Number(value)) {
            callback(errorMessage({ label: label }).number);
          } else if (value && !(value >= 0)) {
            callback(errorMessage({ label: label, value: 0 }).minNumber);
          } else if (value && !(value <= 1000000000)) {
            callback(
              errorMessage({ label: label, value: 1000000000 }).maxNumber
            );
          } else {
            callback();
          }
        },
      },
    ],
    defaultTextArea: [
      { required, message: errorMessage({ label: label }).required },
      {
        max: 500,
        message: errorMessage({ label: label, value: 500 }).maxCharacter,
      },
      {
        min: 3,
        message: errorMessage({ label: label, value: 3 }).minCharacter,
      },
    ],
    defaultSelect: [
      { required, message: errorMessage({ label: label }).required },
    ],
    defaultDatePicker: [
      { required, message: errorMessage({ label: label }).required },
    ],
    defaultRadioButton: [
      { required, message: errorMessage({ label: label }).required },
    ],
    nationalCode: [
      { required, message: errorMessage({ label: label }).required },
      {
        validator(
          rule: RuleObject,
          value: any,
          callback: (error?: string) => void
        ) {
          if (value && !NationalCode(value)) {
            callback(errorMessage({ label: label }).notInvalid);
          } else {
            callback();
          }
        },
      },
    ],
    phoneCellular: [
      { required, message: errorMessage({ label: label }).required },
      {
        validator(
          rule: RuleObject,
          value: any,
          callback: (error?: string) => void
        ) {
          if (value && !PhoneCellular(value)) {
            callback(errorMessage({ label: label }).notInvalid);
          } else {
            callback();
          }
        },
      },
    ],
    phoneLandline: [
      { required, message: errorMessage({ label: label }).required },
      {
        validator(
          rule: RuleObject,
          value: any,
          callback: (error?: string) => void
        ) {
          if (value && !PhoneLandline(value)) {
            callback(errorMessage({ label: label }).notInvalid);
          } else {
            callback();
          }
        },
      },
    ],
    emailAddress: [
      { required, message: errorMessage({ label: label }).required },
      {
        validator(
          rule: RuleObject,
          value: any,
          callback: (error?: string) => void
        ) {
          if (value && !EmailAddress(value)) {
            callback(errorMessage({ label: label }).notInvalid);
          } else if (value && value.length > 50) {
            callback(errorMessage({ label: label, value: 50 }).maxCharacter);
          } else {
            callback();
          }
        },
      },
    ],
    password: [
      { required, message: errorMessage({ label: label }).required },
      {
        validator(
          rule: RuleObject,
          value: any,
          callback: (error?: string) => void
        ) {
          if (value && !setPassword(value)) {
            callback(errorMessage({ label: label }).password);
          } else if (value && value.length < 8) {
            callback(errorMessage({ label: label, value: 8 }).minCharacter);
          } else if (value && value.length > 50) {
            callback(errorMessage({ label: label, value: 50 }).maxCharacter);
          } else {
            callback();
          }
        },
      },
    ],
    confirmPassword: [
      { required, message: errorMessage({ label: label }).required },
      ({ getFieldValue }: NamePath) => ({
        validator(
          rule: RuleObject,
          value: any,
          callback: (error?: string) => void
        ) {
          if (value && getFieldValue(name) !== value) {
            callback(
              errorMessage({ label: label, nextLabel: nextLabel }).confirm
            );
          } else {
            callback();
          }
        },
      }),
    ],
    username: [
      { required, message: errorMessage({ label: label }).required },
      {
        validator(
          rule: RuleObject,
          value: any,
          callback: (error?: string) => void
        ) {
          if (value && !setUserName(value)) {
            callback(errorMessage({ label: label }).username);
          } else if (value && value.length < 8) {
            callback(errorMessage({ label: label, value: 8 }).minCharacter);
          } else if (value && value.length > 50) {
            callback(errorMessage({ label: label, value: 50 }).maxCharacter);
          } else {
            callback();
          }
        },
      },
    ],
  }),
};

export { _Form_Property };

const errorMessage = (props: {
  label: string;
  nextLabel?: string;
  value?: string | number;
}) => ({
  required: `مقدار ${props.label} الزامی است.`,
  maxCharacter: `مقدار ${props.label} حداکثر ${props.value} کاراکتر می باشد.`,
  minCharacter: `مقدار ${props.label} حداقل ${props.value} کاراکتر می باشد.`,
  notInvalid: `مقدار ${props.label} نامعتبر است.`,
  password: `مقدار ${props.label} می تواند کاراکتر انگلیسی و * ! @ # $ % ^ & * () _ + = : ; ' " ~ باشد.`,
  confirm: `مقدار ${props.label} با ${props.nextLabel} مطابقت ندارد.`,
  username: `مقدار ${props.label} میتواند کارکتر انگلیسی و - @ . _  باشد. `,
  number: `مقدار ${props.label} باید به صورت عدد باشد.`,
  minNumber: `مقدار ${props.label} حداقل عدد ${props.value} می باشد.`,
  maxNumber: `مقدار ${props.label} حداکثر عدد ${props.value} می باشد.`,
});
