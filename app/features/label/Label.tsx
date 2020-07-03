import React from "react";

type LabelProps = {
  name: string;
  label: string | React.ReactElement;
};

export const Label: React.FC<LabelProps> = (props) => {
  const { label, name } = props;

  return (
    <label htmlFor={name} className="form__label">
      {label}
    </label>
  );
};

export default Label;
