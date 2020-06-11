import { all, takeEvery, call, put } from 'redux-saga/effects';
import { post, get, remove } from 'utils/api';
import {
  LOAD_ROLES_AND_PERMISSIONS,
  FETCH_ROLES_SUCCESS,
  FETCH_SCOPES_SUCCESS,
  UPDATE_PERMISSION,
  REMOVE_PERMISSION_SUCCESS,
  ADD_PERMISSION_SUCCESS,
} from './constants';

function* loadInitial() {
  try {
    const [roles, scopes] = yield all([
      call(get, '/roles'),
      call(get, '/scopes'),
    ]);

    yield put({ type: FETCH_ROLES_SUCCESS, payload: roles.data });
    yield put({ type: FETCH_SCOPES_SUCCESS, payload: scopes.data });
  } catch (err) {}
}

function* updatePermission(action) {
  const { checked, roleId, scopeId } = action.payload;

  const url = `/roles/${roleId}/scopes`;

  if (checked) {
    // Remove permission
    const data = yield call(remove, `${url}/${scopeId}`);
    yield put({ type: REMOVE_PERMISSION_SUCCESS, payload: data });
  } else {
    const data = yield call(post, url, { scopeId });
    yield put({ type: ADD_PERMISSION_SUCCESS, payload: data });
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js

  yield takeEvery(LOAD_ROLES_AND_PERMISSIONS, loadInitial);
  yield takeEvery(UPDATE_PERMISSION, updatePermission);
}
