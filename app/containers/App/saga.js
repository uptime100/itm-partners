import { takeEvery, call, put } from 'redux-saga/effects';
import _ from 'lodash';
import { get } from 'utils/api';
import { GET_CURRENT_USER } from './constants';
import { getCurrentUserSuccess, setError } from './actions';
import {
  changeCompanyName,
  getAllCompanies,
  getAllUsers,
} from '../CompaniesPage/actions';

function* getCurrentUser() {
  try {
    const url = '/users/me';
    const { data } = yield call(get, url);
    yield put(getCurrentUserSuccess(data));
    yield put(changeCompanyName(data.partner.companyName));
    if (data.role.slug === 'ADMIN' || data.role.slug === 'SUPER_ADMIN') {
      yield put(getAllCompanies());
    } else {
      yield put(getAllUsers());
    }
  } catch (e) {
    yield call(errorHandler, e);
  }
}

function* errorHandler(err) {
  if (!_.isEmpty(err)) {
    yield put(setError(err));
  } else {
    yield put(setError('Something went wrong!'));
  }
}

export default function* defaultSaga() {
  yield takeEvery(GET_CURRENT_USER, getCurrentUser);
}
