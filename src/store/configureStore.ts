/**
 * Create the store with dynamic reducers
 */

import {
  StoreEnhancer,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import { createInjectorsEnhancer } from 'redux-injectors';
import { createReducer } from './reducers';
import createSagaMiddleware from 'redux-saga';

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger');

    logger && middlewares.push(logger);
  }

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ] as StoreEnhancer[];

  const store = configureStore({
    reducer: createReducer(),
    middleware: defaultMiddleware => [
      ...getDefaultMiddleware({ serializableCheck: false }),
      ...defaultMiddleware(),
      ...middlewares,
    ],
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production' ||
      process.env.PUBLIC_URL.length > 0,
    enhancers,
  });

  return store;
}
