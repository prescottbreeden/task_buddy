import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { connect, useDispatch } from 'react-redux';
import { TaskType } from '../../types/TaskType.type';
import { setCurrentTask } from '../../redux/actions/currenttask.actions';
import { getCurrentTask } from '../../redux/selectors/tasks.selectors';
import { deleteTask } from '../../redux/actions/tasks.actions';
import {renderData} from '../../utils/misc';
import Input from '../input/Input';
import Icon from '../icon/Icon';
import Checkbox from '../checkbox/Checkbox';

interface TaskProps {
  onChange: Function;
  currentTask: TaskType;
  task: TaskType;
}

const Task: React.FC<TaskProps> = (props) => {
  const dispatch = useDispatch();
  const { currentTask, onChange, task } = props;

  const [session, setSession] = useState(0);

  const getElapsed = () => {
    const now = new Date().getTime();
    return now - session + task.accumulatedTime;
  };

  const updateCurrentTask = () => {
    dispatch(setCurrentTask(task));
  };

  const removeTask = () => {
    dispatch(deleteTask(task));
  }

  const isCurrentTask = () => {
    if (currentTask && task) {
      return currentTask.id === task.id;
    }
    return false;
  };

  const toggleComplete = () => {
    if (task.isActive) {
      onChange && onChange(task)({
        completed: true,
        isActive: false,
        accumulatedTime: getElapsed(),
      });

    } else {
      onChange && onChange(task)({
        completed: !task.completed,
      });
    }
  };

  const toggleActive = () => {
    if (!task.isActive) {
      setSession(new Date().getTime());
      onChange(task)({ isActive: !task.isActive })
    } else {
      onChange(task)({
        accumulatedTime: getElapsed(),
        isActive: !task.isActive,
      });
    }
  };

  const getTime = (t: number) => {
    const days = Math.floor(t / (1000 * 60 * 60 * 24)); 
    const hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
    const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
    return (`${days}d : ${hours}h : ${minutes}m`);
  }

  const render = renderData(task);

  const getTimeClass = () => {
    return task.isActive
      ? 'tasks__time tasks__time--active'
      : 'tasks__time';
  };

  const getTitleClass = () => {
    const defaultClass = "tasks__input tasks__input--title";
    const { workItemType } = task;
    if (!workItemType) return defaultClass;
    switch (workItemType) {
      case 'Task':
        return `${defaultClass} task-type--task`;
      case 'Bug':
        return `${defaultClass} task-type--bug`;
      case 'User Story':
        return `${defaultClass} task-type--story`;

      default:
        return defaultClass;
    }
  };

  useEffect(() => {
    ipcRenderer.send('test', 'ping');
  }, [])

  return (
    <div
      className="tasks__row"
      onClick={updateCurrentTask}
      style={isCurrentTask() ? { border: ".1rem solid steelblue" } : {}}
    >
      <div className="tasks__description">
        <Input
          name="title"
          className={getTitleClass()}
          onChange={onChange(task)}
          value={render('title').replace(/(\r\n\t|\n|\r\t)/gm,"")}
        />
        <Input
          name="iterationPath"
          className="tasks__input"
          onChange={onChange(task)}
          value={render('iterationPath')}
        />
      </div>
      <div className="tasks__options">
        <div className={getTimeClass()}>
          {getTime(task.accumulatedTime)}
          {!task.completed && 
            <div 
              role="button"
              onClick={toggleActive}
              className="tasks__icon"
            >
              {!task.isActive ? (
                <Icon title="play" className="tasks__icon--svg play" />
              ) : (
                <Icon 
                  animationClass="play-animation"
                  title="pause"
                  className="tasks__icon--svg pause"
                />
              )}
            </div>
          }
        </div>
        <div className="tasks__actions">
          <Checkbox checked={task.completed} onClick={toggleComplete} />
          <div
            role="button"
            onClick={removeTask}
            onKeyDown={() => null}
            className="tasks__icon"
          >
            <Icon title="trash" className="tasks__icon--svg trash" />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const currentTask = getCurrentTask(state);
  return {
    currentTask,
  };
};

export default connect(mapStateToProps)(Task);
