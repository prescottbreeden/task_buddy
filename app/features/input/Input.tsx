import React from "react";
import './Input.css';
import { curry } from "ramda";

type InputProps = {
  className: string;
  disabled?: boolean;
  name: string;
  onChange?: Function;
  placeholder?: string;
  value: string | number;
};

export const Input: React.FC<InputProps> = (props) => {
  const {
    className,
    disabled,
    name,
    onChange,
    placeholder,
    value,
  } = props;

  const handleChange = curry((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (disabled) return;
    let data: {
      [key: string]: unknown;
    } = {};

    data[name] = value;
    onChange && onChange(data, name, value);
  });

  return (
    <input
      className={className}
      disabled={disabled}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default Input;
