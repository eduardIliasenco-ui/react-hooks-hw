import React, { useCallback } from "react";
import { StyledLabel, StyledInput } from "./styles";

const Input = (props) => {
  const {
    onChange,
    value,
    placeholder,
    disabled = false,
    type = "text",
  } = props;

  const handleChange = useCallback((e) => onChange(e.target.value), [onChange]);

  return (
    <StyledLabel>
      <StyledInput
        autoFocus={true}
        {...{ value, placeholder, type, disabled, onChange: handleChange }}
      />
    </StyledLabel>
  );
};

export default Input;
