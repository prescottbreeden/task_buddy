import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getCurrentTask } from "../../redux/selectors/tasks.selectors";
import { setTasks, updateTasks } from "../../redux/actions/tasks.actions";
import { TaskType } from "../../types/TaskType.type";
import { buildOnChange, renderData, noBlank } from "../../utils/misc";
import sadPanda from "../../assets/panda.png";
import ReactHtmlParser from 'react-html-parser';
import Textarea from "../textarea/Textarea";
import Input from "../input/Input";
import Icon from "../icon/Icon";

type NotePadProps = {
  devOps: boolean;
  task: TaskType | any;
};
const NotePad: React.FC<NotePadProps> = ({ devOps, task }) => {
  const dispatch = useDispatch();

  const onChange = buildOnChange<TaskType>(updateTasks, dispatch);

  const [card, setCard] = useState("stats");
  const cards = devOps ?
    ["notes", "acceptance", "description", "stats"] :
    ["notes", "stats"];


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
      return 'Task Completed';
    }
    if (task.accumulatedTime > 0) {
      return 'Paused';
    }
    return 'Ready to Start';
  }

  const render = renderData(task);

  return (
    <div className="notepad">
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
        value={render('notes')}
        style={viewCard("notes")}
      />
      {devOps && 
        <>
          <div
            className="notepad__header"
            onClick={() => handleCardChange("acceptance")}
          >
            <h3 className="notepad__title">Acceptance Criteria</h3>
          </div>
          <div 
            className="notepad__description"
            style={viewCard("acceptance")}
          >
            {task && task.acceptanceCriteria ? (
              ReactHtmlParser(render('acceptanceCriteria'))
            ) : (
              <div className="sad-panda">
                <h2>Nobody gave me acceptance criteria...</h2>
                <img src={sadPanda} alt="Sad Panda" />
              </div>
            )}
          </div>
          <div
            className="notepad__header"
            onClick={() => handleCardChange("description")}
          >
            <h3 className="notepad__title">Description</h3>
          </div>
          <div 
            className="notepad__description"
            style={viewCard("description")}
          >
            {task && task.devOpsDescription ? (
              ReactHtmlParser(render('devOpsDescription'))
            ) : (
              <div className="sad-panda">
                <h2>Nobody gave me a description...</h2>
                <img src={sadPanda} alt="Sad Panda" />
              </div>
            )}
          </div>
        </>
      }
      <div
        className="notepad__header"
        onClick={() => handleCardChange("stats")}
      >
        <h3 className="notepad__title">Details</h3>
      </div>
      <div className="notepad__stats" style={viewCard("stats")}>
        {task && 
          <>
            <div className="notepad__row">
              <p className="notepad__label notepad__label--title">
                Title
                <Icon title="create" className="notepad__icon" />
              </p>
              <Textarea
                name="title"
                className="notepad__textarea notepad__stat"
                onChange={onChange(task)}
                value={render('title')}
              />
            </div>
            <div className="notepad__row">
              <p className="notepad__label notepad__label--title">
                Parent
                <Icon title="create" className="notepad__icon" />
              </p>
              <Textarea
                name="parent"
                className="notepad__textarea notepad__stat"
                onChange={onChange(task)}
                value={render('parent')}
              />
            </div>
            <div className="notepad__row">
              <p className="notepad__label">Ticket Number</p>
              <p className="notepad__stat">
                {render('id').toUpperCase()}
              </p>
            </div>
            {task.iterationPath && 
              <div className="notepad__row">
                <p className="notepad__label">Iteration Path</p>
                <p className="notepad__stat">
                  {render('iterationPath')}
                </p>
              </div>
            }
            {task.workItemType && 
              <div className="notepad__row">
                <p className="notepad__label">Work Item Type</p>
                <p className="notepad__stat">
                  {render('workItemType')}
                </p>
              </div>
            }
            <div className="notepad__row">
              <p className="notepad__label">
                Priority
                <Icon title="create" className="notepad__icon" />
              </p>
              <Input
                name="priority"
                className="notepad__input notepad__stat"
                onChange={onChange(task)}
                value={render('priority')}
              />
            </div>
            {task.severity && 
              <div className="notepad__row">
                <p className="notepad__label">Severity</p>
                <p className="notepad__stat">
                  {render('severity')}
                </p>
              </div>
            }
            {task.createdBy &&
              <div className="notepad__row">
                <p className="notepad__label">Created By</p>
                <p className="notepad__stat">
                  {noBlank(render('createdBy'))}
                </p>
              </div>
            }
            <div className="notepad__row">
              <p className="notepad__label">Created On</p>
              <p className="notepad__stat">
                {noBlank(render('createdDate'))}
              </p>
            </div>
            {task.assignedTo && 
              <div className="notepad__row">
                <p className="notepad__label">Assigned To</p>
                <p className="notepad__stat">
                  {noBlank(render('assignedTo'))}
                </p>
              </div>
            }
            <div className="notepad__row">
              <p className="notepad__label">Started On</p>
              <p className="notepad__stat">
                {noBlank(render('startedDate'))}
              </p>
            </div>
            <div className="notepad__row">
              <p className="notepad__label">
                Estimated Hours
                <Icon title="create" className="notepad__icon" />
              </p>
              <Input
                name="originalEstimate"
                className="notepad__input notepad__stat"
                onChange={onChange(task)}
                value={render('originalEstimate')}
              />
            </div>
            <div className="notepad__row">
              <p className="notepad__label">Current Status</p>
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
  const devOps = state.application.devOps;
  return {
    devOps,
    task,
  };
};

const dispatchProps = {
  setTasks,
};

export default connect(mapStateToProps, dispatchProps)(NotePad);
