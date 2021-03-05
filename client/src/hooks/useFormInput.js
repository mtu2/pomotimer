import { useState } from "react";

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const handleChange = (ev) => {
    setValue(ev.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
}
