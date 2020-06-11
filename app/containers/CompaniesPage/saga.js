import { takeEvery, call, put, select } from 'redux-saga/effects';
import validate from 'validate.js';
import {
  ADD_NEW_COMPANY,
  GET_ALL_COMPANIES,
  GET_ALL_USERS,
  SUSPEND_COMPANY,
} from './constants';
import { GET_ROLES } from '../App/constants';
import _ from 'lodash';
import {
  makeSelectEmailAddress,
  makeSelectRole,
  makeSelectCompanyName,
  makeSelectContactName,
  makeSelectToSuspendCompany,
  makeSelectCompanyNameInput,
} from './selectors';

import { post, get } from 'utils/api';
import {
  setError,
  addNewCompanySuccess,
  getAllCompaniesSuccess,
  getAllCompanies,
  addNewCompanyFailed,
  getAllUsersSuccess,
  SuspendCompanySuccess,
} from './actions';
import { getRolesSuccess } from '../App/actions';
import { toast } from 'react-toastify';

function* addNewCompany() {
  const email = yield select(makeSelectEmailAddress());
  const roleId = yield select(makeSelectRole());
  const companyName = yield select(makeSelectCompanyName());
  const companyNameInput = yield select(makeSelectCompanyNameInput());
  const name = yield select(makeSelectContactName());

  const payload = {
    email,
    roleId,
    companyName: companyName || companyNameInput,
    name,
  };

  const constraints = {
    email: {
      presence: {
        message: '^Please enter an email address',
        allowEmpty: false,
      },
      email: {
        message: '^Please enter a valid email address',
      },
    },
    roleId: {
      presence: {
        message: '^Please select a role',
        allowEmpty: false,
      },
    },
    companyName: {
      presence: {
        message: '^Please enter or select a Company Screen Name',
        allowEmpty: false,
      },
    },
    name: {
      presence: {
        message: '^Please enter a Primary Contact Name',
        allowEmpty: false,
      },
    },
  };
  yield put(addNewCompanyFailed(null));
  const result = validate(payload, constraints, { fullMessages: false });
  if (result) {
    yield put(addNewCompanyFailed(result));
    return;
  }

  const checkEmail = '/users/email';
  try {
    yield call(post, checkEmail, {
      email,
    });
    yield put(
      addNewCompanyFailed({
        email: ['Email is already existing.'],
      }),
    );
    return;
  } catch (e) {
    yield put(addNewCompanyFailed(null));
  }

  try {
    const url = '/partners';
    const { data } = yield call(post, url, payload);
    yield put(addNewCompanySuccess(data));
    yield put(getAllCompanies());
    if (data.addedPartner) {
      toast.success(`${companyName} has been added to the list of companies`);
      setTimeout(() => {
        window.location.replace(`/account/${data.foundPartner._id}`);
      }, 3000);
    } else {
      toast.success(`${name} has been added to ${companyName}`);
    }
  } catch (e) {
    yield call(errorHandler, e);
  }
}

function* getRoles() {
  try {
    const url = '/roles';
    const { data } = yield call(get, url);
    yield put(getRolesSuccess(data));
  } catch (e) {
    yield call(errorHandler, e);
  }
}

function* getCompaniesOrUsers() {
  try {
    const meUrl = '/users/me';
    const { data: user } = yield call(get, meUrl);
    if (user.role.slug === 'ADMIN' || user.role.slug === 'SUPER_ADMIN') {
      const url = '/partners';
      const { data } = yield call(get, url);
      yield put(getAllCompaniesSuccess(data));
    } else {
      const allUsers = `/partners/${user.partner._id}/users/`;
      const { data } = yield call(get, allUsers);
      yield put(getAllUsersSuccess(data));
    }
  } catch (e) {
    yield call(errorHandler, e);
  }
}

function* suspendCompany() {
  const company = yield select(makeSelectToSuspendCompany());
  try {
    const url = '/suspend';
    const { data } = yield call(post, url, company);
    yield put(SuspendCompanySuccess(data));
    toast.success('Company Successfully Suspended');
  } catch (e) {
    toast.error('Oooopss!Something went wrong!');
  }
}

function* errorHandler(err) {
  if (!_.isEmpty(err)) {
    yield put(setError(err));
  } else {
    yield put(setError('Something went wrong!'));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeEvery(ADD_NEW_COMPANY, addNewCompany);
  yield takeEvery(GET_ROLES, getRoles);
  yield takeEvery(GET_ALL_COMPANIES, getCompaniesOrUsers);
  yield takeEvery(GET_ALL_USERS, getCompaniesOrUsers);
  yield takeEvery(SUSPEND_COMPANY, suspendCompany);
}
