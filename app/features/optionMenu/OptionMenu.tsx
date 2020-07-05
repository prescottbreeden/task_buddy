import React, { FC } from 'react';
import {updateApplication} from '../../redux/actions/application.actions';
import {useDispatch, connect} from 'react-redux';
import {getOptionsState} from '../../redux/selectors/application.selectors';
import {ApplicationState} from '../../types/ApplicationState.type';
import Checkbox from '../checkbox/Checkbox';
import Icon from '../icon/Icon';

const OptionMenu: FC<Partial<ApplicationState>> = ({ options }) => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(updateApplication({ options: !options }));

  const clsName = () => {
    return options ?
      "options-menu__container open-options-menu" :
      "options-menu__container";
  }

  return (
    <div className={clsName()}>
      <div onClick={handleClose} className="options-menu__close">
        <Icon title="cancel" className="options-menu__close-icon" />
      </div>
      <div className="options-menu">
        <div className="options-menu__header">
          <p className="options-menu__title">Select Options</p>
        </div>
        <div className="options-menu__row">
          <Checkbox checked={false} onClick={() => null} />
          <p className="options-menu__label">Show Tasks</p>
        </div>
        <div className="options-menu__row">
          <Checkbox checked={true} onClick={() => null} />
          <p className="options-menu__label options-menu__label--active">
            Show Bugs
          </p>
        </div>
        <div className="options-menu__row">
          <Checkbox checked={false} onClick={() => null} />
          <p className="options-menu__label">Show User Stories</p>
        </div>
        <div className="options-menu__row">
          <Checkbox checked={false} onClick={() => null} />
          <p className="options-menu__label">Disable Color Sync</p>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state: ApplicationState) => {
  const options = getOptionsState(state);
  return { options };
}

export default connect(mapStateToProps)(OptionMenu);
