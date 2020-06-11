import { takeEvery, call, put } from 'redux-saga/effects';
import { get } from 'utils/api';
import { FETCH_INITIAL_DATA, FETCH_INITIAL_DATA_SUCCESS } from './constants';

function* fetchInitial(action) {
  const { data } = yield call(get, `/partners/${action.payload}`);
  // console.log('PARTNER ACCOUNT: ', data);
  yield put({ type: FETCH_INITIAL_DATA_SUCCESS, payload: data });
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js

  yield takeEvery(FETCH_INITIAL_DATA, fetchInitial);
}
