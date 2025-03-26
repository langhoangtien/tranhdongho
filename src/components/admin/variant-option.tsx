"use client";
import { X } from "lucide-react";
import { useState } from "react";

type VariantOptionValuesInputProps = {
  values: string[];
  handleChangeVariantOptionValues: (values: string[]) => void;
};

export default function VariantOptionValuesInput({
  values,
  handleChangeVariantOptionValues,
}: VariantOptionValuesInputProps) {
  const [inputValue, setValueInputValue] = useState("");
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInputValue(e.target.value);
  };

  const removeVariantOptionValue = (index: number) => {
    handleChangeVariantOptionValues(values.filter((_, i) => i !== index));
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      if (!values.includes(inputValue))
        handleChangeVariantOptionValues([...values, inputValue]);

      setValueInputValue("");
      e.preventDefault();
    } else if (e.key === "Backspace" && inputValue === "") {
      handleChangeVariantOptionValues(values.slice(0, values.length - 1));
    }
  };
  return (
    <div className="flex flex-grow flex-wrap gap-2 min-h-10 border bg-background border-border p-2 rounded-md">
      {values.map((value, index) => (
        <button
          key={index}
          className="bg-gray-200 text-sm px-2 py-0.5 mr-2 rounded inline-flex items-center justify-center"
        >
          {value}
          <X
            strokeWidth={1}
            size={16}
            className="ml-2 cursor-pointer"
            onClick={() => removeVariantOptionValue(index)}
          />
        </button>
      ))}
      <input
        placeholder="Gõ và nhân Enter để thêm giá trị"
        className="border-none focus:outline-none flex-grow"
        value={inputValue}
        onChange={handleChangeValue}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
