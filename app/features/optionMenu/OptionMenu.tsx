import React, { FC } from 'react';
import {updateApplication} from '../../redux/actions/application.actions';
import {useDispatch, connect} from 'react-redux';
import {ApplicationState} from '../../types/ApplicationState.type';
import Checkbox from '../checkbox/Checkbox';
import Icon from '../icon/Icon';

const OptionMenu: FC<ApplicationState> = ({ options, filters, sortBy }) => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(updateApplication({ options: !options }));

  const componentClsName = () => {
    return options ?
      "options-menu__container open-options-menu" :
      "options-menu__container";
  };

  const labelClsName = (bool: boolean) => {
    return bool ?
      "options-menu__label options-menu__label--active":
      "options-menu__label";
  };

  const toggle = (changes: any) => {
    dispatch(updateApplication({ filters: {...filters, ...changes }}));
  };

  const sort = (newSort: string) => {
    newSort !== sortBy ?
      dispatch(updateApplication({ sortBy: newSort })) :
      dispatch(updateApplication({ sortBy: '' }));
  };

  return (
    <div className={componentClsName()}>
      <div onClick={handleClose} className="options-menu__close">
        <Icon title="cancel" className="options-menu__close-icon" />
      </div>
      <div className="options-menu">
        <div className="options-menu__group">
          <div className="options-menu__column">
            <div className="options-menu__header">
              <p className="options-menu__title">Select Filters</p>
            </div>
            <div className="options-menu__row">
              <Checkbox
                checked={filters.Task}
                onClick={() => toggle({ Task: !filters.Task })} 
                tooltip="Select to display tasks on Dashboard."
              />
              <p className={labelClsName(filters.Task)}>Show Tasks</p>
            </div>
            <div className="options-menu__row">
              <Checkbox
                checked={filters.Bug}
                onClick={() => toggle({ Bug: !filters.Bug })} 
                tooltip="Select to display bugs on Dashboard."
              />
              <p className={labelClsName(filters.Bug)}>Show Bugs</p>
            </div>
            <div className="options-menu__row">
              <Checkbox
                checked={filters['User Story']}
                onClick={() => toggle({ ['User Story']: !filters['User Story'] })} 
                tooltip="Select to display user stories on Dashboard."
              />
              <p className={labelClsName(filters['User Story'])}>Show User Stories</p>
            </div>
          </div>
          <div className="options-menu__column">
            <div className="options-menu__header">
              <p className="options-menu__title">Select Sorting Preference</p>
            </div>
            <div className="options-menu__row">
              <Checkbox 
                checked={sortBy === 'title'}
                onClick={() => sort('title')}
                tooltip="Select to sort titles A-Z."
              />
              <p className={labelClsName(sortBy === 'title')}>Title A-Z</p>
            </div>
            <div className="options-menu__row">
              <Checkbox 
                checked={sortBy === 'priority'}
                onClick={() => sort('priority')}
                tooltip="Select to sort in order of highest priority."
              />
              <p className={labelClsName(sortBy === 'priority')}>Priority</p>
            </div>
            <div className="options-menu__row">
              <Checkbox
                checked={sortBy === 'createdDate'}
                onClick={() => sort('createdDate')}
                tooltip="Select to sort in order of oldest created date."
              />
              <p className={labelClsName(sortBy === 'createdDate')}>Created Date</p>
            </div>
            <div className="options-menu__row">
              <Checkbox
                checked={sortBy === 'startedDate'}
                onClick={() => sort('startedDate')}
                tooltip="Select to sort in order of oldest started date."
              />
              <p className={labelClsName(sortBy === 'startedDate')}>Started Date</p>
            </div>
            <div className="options-menu__row">
              <Checkbox
                checked={sortBy === 'completedDate'}
                onClick={() => sort('completedDate')} 
                tooltip="Select to sort in order of oldest ompleted date."
              />
              <p className={labelClsName(sortBy === 'completedDate')}>Completed Date</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state: any) => {
  const { options, filters, sortBy } = state.application;
  return { options, filters, sortBy };
}

export default connect(mapStateToProps)(OptionMenu);
