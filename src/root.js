import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configStore from './store/configStore';
import rootSage from './sagas/index';
import App from './app';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {}
  };
}

const store = configStore();
store.runSaga(rootSage);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
