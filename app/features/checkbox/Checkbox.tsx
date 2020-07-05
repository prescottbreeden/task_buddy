import React, { FC } from 'react';
import Icon from '../icon/Icon';

type CheckboxInput = {
  checked: boolean;
  onClick: () => void;
}

const Checkbox: FC<CheckboxInput> = ({ checked, onClick }) => {

  return (
    <>
      {!checked && (
        <div
          aria-checked
          role="checkbox"
          onClick={onClick}
          className="tasks__icon"
        >
          <Icon title="unchecked" className="tasks__icon--svg" />
        </div>
      )}
      {checked && (
        <div
          aria-checked
          role="checkbox"
          onClick={onClick}
          className="tasks__icon"
        >
          <Icon title="checked" className="tasks__icon--svg" />
        </div>
      )}
    </>
  );
};

export default Checkbox;
