import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { currentTaskReducer } from './redux/reducers/currentTask.reducers';
import { tasksReducer } from './redux/reducers/tasks.reducers';
import {applicationReducer} from './redux/reducers/application.reducers';

export default function createRootReducer(history: History) {
  return combineReducers({
    application: applicationReducer,
    currentTask: currentTaskReducer,
    router: connectRouter(history),
    tasks: tasksReducer,
  });
}
