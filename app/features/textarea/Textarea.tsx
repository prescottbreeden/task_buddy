import React from "react";
import { curry } from "ramda";

type TextAreaProps = {
  className: string;
  disabled?: boolean;
  name: string;
  onChange?: Function;
  placeholder?: string;
  value: string | number;
  style?: any;
};

export const Textarea: React.FC<TextAreaProps> = (props) => {
  const {
    className,
    disabled,
    name,
    onChange,
    placeholder,
    value,
    style,
  } = props;

  const handleChange = curry((event: any) => {
    const value = event.target.value;
    if (disabled) return;
    let data: {
      [key: string]: unknown;
    } = {};

    data[name] = value;
    onChange && onChange(data, name, value);
  });

  return (
    <textarea
      style={style}
      className={className}
      disabled={disabled}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default Textarea;
