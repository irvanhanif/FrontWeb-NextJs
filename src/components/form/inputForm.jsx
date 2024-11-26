import { Input } from "@nextui-org/react";
import React from "react";

const InputForm = ({
  label,
  type,
  endContent,
  changeVisibility,
  value,
  setValue,
  description,
  required,
  labelPlace,
  placeholder,
  setFocus,
  isInvalid,
  errorMessage,
}) => {
  return (
    <Input
      label={label}
      type={type == "password" && changeVisibility ? "text" : type}
      description={description}
      isClearable={type != "password"}
      isRequired={required}
      labelPlacement={labelPlace}
      placeholder={
        typeof placeholder == "string"
          ? placeholder
          : placeholder
          ? "Masukkan " + label
          : ""
      }
      className={isInvalid ? "text-danger" : "text-white/75"}
      classNames={{
        label: [
          "text-default-100",
          "group-data-[filled-within=true]:text-default-100",
        ],
        input: [
          "bg-transparent",
          "group-data-[has-value=true]:text-white/90",
          "placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
          "shadow-xl",
          "bg-default-200/50",
          "backdrop-blur-xl",
          "backdrop-saturate-200",
          "hover:bg-default-200/70",
          "group-data-[focus=true]:bg-default-200/50",
          "group-data-[hover=true]:bg-default-200/50",
          "group-data-[hover=true]:bg-default-200/50",
          "!cursor-text",
        ],
        errorMessage: ["bg-danger", "rounded", "w-fit", "px-2", "text-white"],
      }}
      endContent={endContent}
      onValueChange={(val) => setValue(val)}
      value={value}
      onFocus={() => setFocus?.(true)}
      onBlur={() => setFocus?.(false)}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
    />
  );
};

export default InputForm;
