import React, { ChangeEvent } from 'react';
import { curry } from 'ramda';

type InputProps = {
  className: string;
  disabled?: boolean;
  name: string;
  onChange?: <T>(data: T, name: keyof T, val: unknown) => void;
  placeholder?: string;
  value: string | number;
};

export const Input: React.FC<InputProps> = (props) => {
  const {
    className,
    disabled = false,
    name,
    onChange,
    placeholder,
    value,
  } = props;

  const handleChange = curry((event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (disabled) return;
    const data = {
      [name]: val,
    };
    onChange && onChange(data, name, val);
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
