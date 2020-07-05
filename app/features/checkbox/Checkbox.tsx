import React, { FC } from 'react';
import Tooltip from '../tooltip/Tooltip';
import Icon from '../icon/Icon';

type CheckboxInput = {
  checked: boolean;
  onClick: () => void;
  tooltip: string;
}

const Checkbox: FC<CheckboxInput> = ({ checked, onClick, tooltip}) => {

  return (
    <Tooltip 
      tooltip={tooltip}
      indicator= {
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
      }
    >
    </Tooltip>
  );
};

export default Checkbox;
