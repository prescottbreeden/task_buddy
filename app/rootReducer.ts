import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { currentTaskReducer } from './redux/reducers/currentTask.reducers';
import { tasksReducer } from './redux/reducers/tasks.reducers';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    currentTask: currentTaskReducer,
    tasks: tasksReducer,
  });
}
