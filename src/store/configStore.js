import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from '../reducers';

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);

let reduxDevtool;
if (process.env.NODE_ENV === 'development') {
  // const { logger } = require('redux-logger');
  // middlewares.push(logger);
  reduxDevtool =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest;
  global.FormData = global.originalFormData
    ? global.originalFormData
    : global.FormData;

  console.disableYellowBox = true; // just for test
  // console.warn('YellowBox is disabled.'); // just for test
}

const enhancers = reduxDevtool
  ? compose(applyMiddleware(...middlewares), reduxDevtool)
  : compose(applyMiddleware(...middlewares));

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancers);
  // install saga run
  store.runSaga = sagaMiddleware.run; // createStoreWithMiddleware 后调用装载 自定义saga
  store.close = () => store.dispatch(END);

  return store;
}
