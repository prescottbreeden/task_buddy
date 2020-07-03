import { configureStore, Action } from '@reduxjs/toolkit';
import { createHashHistory } from 'history';
import { ThunkAction } from 'redux-thunk';
// eslint-disable-next-line import/no-cycle
import createRootReducer from './rootReducer';
import { tasksMiddleware } from './redux/middleware/tasks.middleware';
import {currentTaskMiddleware} from './redux/middleware/currentTask.middleware';
import {fileMiddleware} from './redux/middleware/file.middleware';

export const history = createHashHistory();
const rootReducer = createRootReducer(history);
export type RootState = ReturnType<typeof rootReducer>;

// const router = routerMiddleware(history);
const middleware = [tasksMiddleware, currentTaskMiddleware, fileMiddleware];

export const configuredStore = (initialState?: RootState) => {
  // Create Store
  const store = configureStore({
    reducer: rootReducer,
    middleware,
    preloadedState: initialState,
  });

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept(
      './rootReducer',
      () => store.replaceReducer(require('./rootReducer').default)
    );
  }
  return store;
};
export type Store = ReturnType<typeof configuredStore>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
