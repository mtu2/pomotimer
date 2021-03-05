import { useState } from "react";

export function useFormCheckbox(initialValue) {
  const [checked, setChecked] = useState(initialValue);

  const handleChange = () => {
    setChecked((curr) => !curr);
  };

  return {
    checked,
    onChange: handleChange,
  };
}
