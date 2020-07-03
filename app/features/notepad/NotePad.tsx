import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getCurrentTask, getTasks } from "../../redux/selectors/tasks.selectors";
import { setTasks } from "../../redux/actions/tasks.actions";
import { TaskType } from "../../types/TaskType.type";
import {buildOnChange} from "../../utils/misc";
import Textarea from "../textarea/Textarea";
import Input from "../input/Input";

type NotePadProps = {
  task: TaskType;
  tasks: TaskType[];
};
const NotePad: React.FC<NotePadProps> = (props) => {
  const dispatch = useDispatch();
  const { task, tasks } = props;

  const onChange = buildOnChange<TaskType>(tasks, "id", setTasks, dispatch);

  const [card, setCard] = useState("stats");
  const cards = ["description", "notes", "stats"];

  const handleCardChange = (view: string) => {
    if (card === view) {
      const index = cards.indexOf(view);
      if (index > -1 && index < cards.length - 1) {
        setCard(cards[index + 1]);
      }
    } else {
      setCard(view);
    }
  };

  const viewCard = (view: string) => {
    return card === view
      ? { flexGrow: 1 }
      : { height: 0, overflow: "hidden", padding: 0, border: "none" };
  };

  const getStatus = () => {
    if (task.isActive) {
      return 'In Progress';
    }
    if (task.completed) {
      return 'Task Completed'
    }
    return 'Ready to Start'
  }

  return (
    <div className="notepad">
      <div
        className="notepad__header"
        onClick={() => handleCardChange("description")}
      >
        <h3 className="notepad__title">Description</h3>
      </div>
      <Textarea
        name="description"
        onChange={onChange(task)}
        className="notepad__description"
        value={task && task.description}
        style={viewCard("description")}
      />
      <div
        className="notepad__header"
        onClick={() => handleCardChange("notes")}
      >
        <h3 className="notepad__title">Notepad</h3>
      </div>
      <Textarea
        name="notes"
        onChange={onChange(task)}
        className="notepad__notes"
        value={task && task.notes}
        style={viewCard("notes")}
      />
      <div
        className="notepad__header"
        onClick={() => handleCardChange("stats")}
      >
        <h3 className="notepad__title">Stats</h3>
      </div>
      <div className="notepad__stats" style={viewCard("stats")}>
        {task && 
          <>
            <div className="notepad__row">
              <p className="notepad__label">Created</p>
              <p className="notepad__stat">{task && task.startedDate.toLocaleDateString()}</p>
            </div>
            <div className="notepad__row">
              <p className="notepad__label">Estimate</p>
              <Input
                name="originalEstimate"
                className="notepad__input notepad__stat"
                onChange={onChange(task)}
                value={task && task.originalEstimate}
              />
            </div>
            <div className="notepad__row">
              <p className="notepad__label">Status</p>
              <p className="notepad__stat">
                {getStatus()}
              </p>
            </div>
          </>
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const task = getCurrentTask(state);
  const tasks = getTasks(state);
  return {
    task,
    tasks
  };
};

const dispatchProps = {
  setTasks,
};

export default connect(mapStateToProps, dispatchProps)(NotePad);
