import { takeEvery, call, put, select } from 'redux-saga/effects';
import {
  LOAD_INITIAL,
  LOAD_INITIAL_SUCCESS,
  ADD_NEW_PARTNER,
  ADD_NEW_USER,
  ADD_NEW_USER_SUCCESS,
  FETCH_PARTNERS,
  FETCH_PARTNERS_SUCCESS,
  SUSPEND_PARTNER,
  TOGGLE_MODAL,
  SUSPEND_PARTNER_SUCCESS,
  SUSPEND_PARTNER_ERROR,
  RESET_PASSWORD,
  CLOSE_RESET_PASSWORD_MODAL,
  SUSPEND_USER,
  SUSPEND_USER_SUCCESS,
  UPDATE_SORTING,
  UPDATE_USER_ROLE,
  FILTER_PARTNERS,
} from './constants';
import { get, post, put as putRequest } from 'utils/api';
import { toast } from 'react-toastify';
// import history from '../../utils/history';

import makeSelectDirectoryPage, { makeSelectSorting } from './selectors';

function* fetchInitialData() {
  try {
    // 1 Network Request
    const { data: rolesResponse } = yield call(get, '/roles');
    const roles = rolesResponse;

    const { data: meResponse } = yield call(get, '/users/me');
    const isIntimateUser =
      meResponse.role.slug === 'SUPER_ADMIN' ||
      meResponse.role.slug === 'ADMIN';
    // console.log(meResponse)
    const directorypage = yield select(makeSelectDirectoryPage());

    let partners = null;
    let users = null;
    let pagination = null;
    if (isIntimateUser) {
      const { data: partnersResponse } = yield call(
        get,
        `/partners?limit=${directorypage.limit}`,
      );
      partners = partnersResponse.docs;
      const { totalDocs, limit, page, totalPages } = partnersResponse;
      pagination = { totalDocs, limit, page, totalPages };
    } else {
      const allUsers = `/partners/${meResponse.partner._id}/users/`;
      const { data: usersResponse } = yield call(get, allUsers);

      users = usersResponse.docs;
    }

    yield put({
      type: LOAD_INITIAL_SUCCESS,
      payload: {
        partners: { data: partners, pagination },
        roles,
        me: meResponse,
        users,
      },
    });
  } catch (e) {}
}

function* fetchPartners(action) {
  try {
    const directorypage = yield select(makeSelectDirectoryPage());
    const sorting = yield select(makeSelectSorting());

    // Get Sort Params
    const sortOptions = [[sorting.column, sorting.value]];
    const sortParams = encodeURI(JSON.stringify(sortOptions));

    //
    const sort = sorting.column.length !== 0 ? `sort=${sortParams}&` : '';
    //

    // Filter params
    let { filter } = directorypage;
    let filterParams = null;
    if (filter) {
      filter.categories = filter.categories
        ? filter.categories.value
          ? filter.categories.value
          : undefined
        : undefined;
      filter.plugins = filter.plugins
        ? filter.plugins.value
          ? filter.plugins.value
          : undefined
        : undefined;
      filter.name = filter.name
        ? { $regex: `.*${filter.name}.*`, $options: 'i' }
        : undefined;

      if (filter.categories || filter.plugins || filter.name) {
        filterParams = encodeURI(JSON.stringify(filter));
      }
    }

    let defaultPage = action.payload.page ? action.payload.page : 1;

    // Page
    let params = `${sort}&page=${defaultPage}&limit=${directorypage.limit}${
      filterParams ? `&filter=${filterParams}` : ''
    }`;

    const { data: partnersResponse } = yield call(
      get,
      `/partners?${params}`,
      // }${filterParams ? '&filter=' + filterParams : ''}`,
    );
    const partners = partnersResponse.docs;
    const { totalDocs, limit, page, totalPages } = partnersResponse;
    const pagination = { totalDocs, limit, page, totalPages };
    yield put({
      type: FETCH_PARTNERS_SUCCESS,
      payload: { data: partners, pagination },
    });
  } catch (e) {
    // console.log(e);
  }
}

function* addNewPartner(action) {
  const url = '/partners';

  const { data } = yield call(post, url, action.payload);

  if (data.partner) {
    toast.success(
      `${data.partner.name} has been added to the list of partners`,
    );
    /*
      NOTE!!
      use yield call on history.push to avoid 'Generator is already running' error when switching routes...
    */
    // yield call(history.push, `/account/${data.partner._id}`);
  }
}

function* addNewUser(action) {
  const partnerId = action.payload.partner.value;
  const userData = {
    email: action.payload.email,
    name: action.payload.name,
    role: action.payload.role.value,
  };

  const url = `/partners/${partnerId}/users`;
  const { data } = yield call(post, url, userData);
  if (data._id) {
    // responded with newly created object
    toast.success(`${data.name} has been successfully added`);
    data.role = {
      _id: data.role,
      name: action.payload.role.label,
    };
    yield put({ type: ADD_NEW_USER_SUCCESS, payload: data });
  }
}

function* suspendPartner() {
  const directorypage = yield select(makeSelectDirectoryPage());
  if (!directorypage.partnerToSuspend) {
    return;
  }
  try {
    const partnerId = directorypage.partnerToSuspend._id;
    const url = `/partners/${partnerId}/${directorypage.suspendType}`;

    const { data } = yield call(putRequest, url, {});
    toast.success(
      `${data.res.name} has been ${
        directorypage.suspendType === 'suspend' ? 'suspended' : 'activated'
      } successfully`,
    );
    yield put({ type: TOGGLE_MODAL, payload: false });
    yield put({
      type: SUSPEND_PARTNER_SUCCESS,
      payload: {
        id: data.res._id,
        isActive: directorypage.suspendType !== 'suspend',
      },
    });
  } catch (err) {
    yield put({ type: SUSPEND_PARTNER_ERROR });
    toast.error('An error occurred!');
  }
}

function* resetPassword() {
  const directorypage = yield select(makeSelectDirectoryPage());

  try {
    const url = `/users/resetPassword`;
    yield call(post, url, { email: directorypage.emailToResetPassword });
    toast.success(
      `An email has been sent to ${
        directorypage.emailToResetPassword
      } for the reset password link`,
    );
  } catch (err) {
    toast.error('An error occured!');
  }

  yield put({ type: CLOSE_RESET_PASSWORD_MODAL });
}

function* suspendUser() {
  const directorypage = yield select(makeSelectDirectoryPage());
  const { emailToSuspend, suspendType } = directorypage;
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

function* updateUserRole(action) {
  let { userId, roleId } = action.payload;

  const url = `/users/${userId}`;

  // const { data } = yield call(putRequest, url, { role: roleId });
  yield call(putRequest, url, { role: roleId });
  toast.success('Updated');
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js

  yield takeEvery(LOAD_INITIAL, fetchInitialData);
  yield takeEvery(ADD_NEW_PARTNER, addNewPartner);
  yield takeEvery(ADD_NEW_USER, addNewUser);
  yield takeEvery(FETCH_PARTNERS, fetchPartners);
  yield takeEvery(SUSPEND_PARTNER, suspendPartner);
  yield takeEvery(RESET_PASSWORD, resetPassword);
  yield takeEvery(SUSPEND_USER, suspendUser);
  yield takeEvery(UPDATE_SORTING, fetchPartners);
  yield takeEvery(UPDATE_USER_ROLE, updateUserRole);
  yield takeEvery(FILTER_PARTNERS, fetchPartners);
}
