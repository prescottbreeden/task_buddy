import React from "react";
import { connect, useDispatch } from "react-redux";
import { TaskType, emptyTask } from "../../types/TaskType.type";
import { getTasks } from "../../redux/selectors/tasks.selectors";
import { buildOnChange } from "../../utils/misc";
import { updateTasks } from "../../redux/actions/tasks.actions";
import Task from "../task/Task";
import Icon from "../icon/Icon";

type TasksProps = {
  tasks: TaskType[] | any;
};
const Tasks: React.FC<TasksProps> = (props) => {
  const dispatch = useDispatch();
  const { tasks } = props;

  const onChange = buildOnChange<TaskType>(updateTasks, dispatch);

  const createTask = () => {
    dispatch(updateTasks(emptyTask()));
  }

  return (
    <div className="tasks">
      <div className="tasks__header">
        <div className="tasks__col tasks__description">
          <p className="tasks__title">Work Items</p>
        </div>
        <div className="tasks__options">
          <div className="tasks__col tasks__time">
            <p className="tasks__title">Work Effort</p>
          </div>
          <div className="tasks__col tasks__actions">
            <p className="tasks__title">Actions</p>
          </div>
        </div>
      </div>
      {tasks &&
        tasks.map((task: any, index: number) => {
          return <Task key={index} task={task} onChange={onChange(task)} />;
        })}
      <div className="tasks__col tasks__icon--add">
        <div onClick={createTask} className="tasks__icon--btn">
          <Icon title="add" className="tasks__icon--svg add"/>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const tasks = getTasks(state);

  return {
    tasks,
  };
};

export default connect(mapStateToProps)(Tasks);
