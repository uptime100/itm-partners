import { takeEvery, call, put, select } from 'redux-saga/effects';
import {
  LOAD_INITIAL,
  EDIT_PARTNER_ACCOUNT,
  RESET_PASSWORD,
  SET_CURRENT_PARTNER,
  SUSPEND_USER,
  SUSPEND_USER_SUCCESS,
} from './constants';
import { get, put as putRequest, post } from 'utils/api';
import { updateAccountForm } from './actions';
import { toast } from 'react-toastify';

import makeSelectAccountPage from './selectors';
import { makeSelectCurrentUser } from '../App/selectors';

function* loadPartner() {
  const { form } = yield select(makeSelectAccountPage());

  try {
    const { data } = yield call(get, `/partners/${form._id}`);

    for (const [name, value] of Object.entries(data)) {
      yield put({ type: SET_CURRENT_PARTNER, payload: data });
      yield put(updateAccountForm(name, value));
    }
  } catch (e) {}
}

function* editPartner() {
  const accountPage = yield select(makeSelectAccountPage());
  const payload = {
    ...accountPage.form,
  };

  delete payload.companyName;
  delete payload.users;
  delete payload.accountEmail;
  delete payload.isActive;
  delete payload.companyScreenName;

  const id = payload._id;
  delete payload._id;

  for (const key in payload) {
    if (
      key !== 'website' &&
      key !== 'publicEmailAddress' &&
      key !== 'nameFull'
    ) {
      if (typeof payload[key] === 'string') {
        if (payload[key].trim() === '') {
          delete payload[key];
        }
      }
    }
  }

  try {
    const url = `/partners/${id}`;
    yield call(putRequest, url, payload);
    // yield put(editPartnerSuccess(data));
    toast.success('Company details successfully updated');
  } catch (e) {
    // console.log(e);
    if (e.statusCode === 400) {
      toast.error(e.message);
    } else {
      toast.error('An unknown error occured');
    }
  }
}

function* resetPassword() {
  const accountPage = yield select(makeSelectAccountPage());
  const currentUser = yield select(makeSelectCurrentUser());
  const { form } = accountPage;
  const { role } = currentUser;

  const accoutEmailPartner = form.users
    ? form.users[0].email
    : currentUser.email;

  const emailToReset =
    role.slug === 'SUPER_ADMIN' || role.slug === 'ADMIN'
      ? accoutEmailPartner
      : currentUser.email;

  if (form.users && form.users.length > 0) {
    try {
      const url = `/users/resetPassword`;
      yield call(post, url, { email: emailToReset });
      toast.success(
        `An email has been sent to ${emailToReset} for the reset password link`,
      );
    } catch (err) {
      toast.error('An error occured!');
    }
  }
}

function* suspendUser() {
  const accountpage = yield select(makeSelectAccountPage());
  const { userToSuspend } = accountpage;
  const { email: emailToSuspend } = userToSuspend;

  let suspendType = userToSuspend.isActive ? 'suspend' : 'activate';

  try {
    const url = `/users/${suspendType}`;
    const { data } = yield call(post, url, { email: emailToSuspend });
    if (suspendType === 'suspend') {
      toast.success(
        `User with email "${emailToSuspend}" suspended successfully`,
      );
    } else {
      toast.success(
        `User with email "${emailToSuspend}" activated successfully`,
      );
    }

    yield put({ type: SUSPEND_USER_SUCCESS, payload: data });
  } catch (err) {
    toast.error('An error occured!');
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(LOAD_INITIAL, loadPartner);
  yield takeEvery(EDIT_PARTNER_ACCOUNT, editPartner);
  yield takeEvery(RESET_PASSWORD, resetPassword);
  yield takeEvery(SUSPEND_USER, suspendUser);
}
