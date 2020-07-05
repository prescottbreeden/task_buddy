import React, { FC } from 'react';
import {useDispatch, connect} from 'react-redux';
import {updateApplication} from '../../redux/actions/application.actions';
import {getOptionsState} from '../../redux/selectors/application.selectors';
import {ApplicationState} from '../../types/ApplicationState.type';

const MenuButton: FC<ApplicationState> = ({ options }) => {
  const dispatch = useDispatch();
  const toggleOptions = () => dispatch(updateApplication({ options: !options }));
  return (
    <button tabIndex={0} className="menuButton" onClick={toggleOptions}>
      Options Menu
    </button>
  );
}

const mapStateToProps = (state: any) => {
  const options = getOptionsState(state);
  return { options };
};

export default connect(mapStateToProps)(MenuButton);
