import { fork, all } from 'redux-saga/effects';
import * as home from './home';

export default function* rootSaga() {
  yield all([
    fork(home.watchGetHomeInfo)
  ]);
}
