import React from 'react';

type TooltipComponentProps = {
  indicator: string | JSX.Element;
  tooltip: string | JSX.Element;
};

const Tooltip: React.FC<TooltipComponentProps> = (props) => {
  const { indicator, tooltip } = props;

  const tooltipClassName = () => {
    if (typeof tooltip === 'string') {
      return tooltip.length > 70
        ? 'tooltiptext tooltiptext--long'
        : 'tooltiptext tooltiptext--short';
    }
    return 'tooltiptext--long';
  };
  return (
    <div className="tooltip" aria-hidden="true">
      {indicator}
      <span className={tooltipClassName()}>{tooltip}</span>
    </div>
  );
};

export default Tooltip;
