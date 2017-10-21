import { put, take, call, fork, select, all } from 'redux-saga/effects';
import { types } from '../actions/home';

function* getHomeInfo(payload = {}) {
  yield put({
    type: types.GET_HOME_INFO_SUCCESS,
    payload: payload
  })
}

export function* watchGetHomeInfo() {
  while (true) {
    const { payload } = yield take(types.GET_HOME_INFO);
    yield fork(getHomeInfo, payload);
  }
}
