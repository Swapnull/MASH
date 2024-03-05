import { TextInput } from "flowbite-react";
import { useState } from "react";

export default function Input({ value, update }) {
  const [inputValue, setInputValue] = useState(value);

  return (
    <TextInput
      value={inputValue}
      className="grow"
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={(e) => update(e.target.value)}
    />
  );
}
