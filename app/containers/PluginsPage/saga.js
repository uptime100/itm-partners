import { takeEvery, call, put, select } from 'redux-saga/effects';
import {
  GET_INTIMATE_API_CLIENT_ID_FORM,
  RESET_INTIMATE_API_ID,
  FETCH_CURRENT_USER,
  UPDATE_CURRENT_USER,
  SAVE_WALLET_ADDRESS,
  RESET_API_KEY,
  UPDATE_API_KEY,
} from './constants';

import {
  makeSelectIntimateClientID,
  makeSelectIntimateClientSecretID,
  makeSelectWoocommerceClientID,
  makeSelectWoocommerceClientSecretID,
} from './selectors';
import {
  resetWoocommerceAPIIDSuccess,
  changeIntimateClientID,
  changeIntimateClientSecretID,
  resetIntimateAPIIDSuccess,
} from './actions';

import { post, get, put as putRequest } from 'utils/api';
import { toast } from 'react-toastify';

function* getIntimateAPIClientID() {
  try {
    const { data } = yield call(get, `/plugins`);
    yield put(changeIntimateClientID(data.clientID));
    yield put(changeIntimateClientSecretID(data.partnerID));
  } catch (e) {
    yield call(e);
  }
}

function* resetIntimateAPIIDs() {
  const intimateClientID = yield select(makeSelectIntimateClientID());
  const intimateClientSecretID = yield select(
    makeSelectIntimateClientSecretID(),
  );

  const payload = {
    intimateClientID,
    intimateClientSecretID,
  };

  try {
    const url = '/plugins';
    const { data } = yield call(post, url, payload);
    yield put(resetIntimateAPIIDSuccess(data));
  } catch (e) {
    yield call(e);
  }
}

function* resetWoocommerceAPIIDs() {
  const woocommerceClientID = yield select(makeSelectWoocommerceClientID());
  const woocommerceClientSecretID = yield select(
    makeSelectWoocommerceClientSecretID(),
  );

  const payload = {
    woocommerceClientID,
    woocommerceClientSecretID,
  };

  try {
    const url = '/plugins';
    const { data } = yield call(post, url, payload);
    yield put(resetWoocommerceAPIIDSuccess(data));
  } catch (e) {
    yield call(e);
  }
}

function* fetchCurrentUser() {
  try {
    const url = '/users/me';

    const { data } = yield call(get, url);

    yield put({ type: UPDATE_CURRENT_USER, payload: data });
  } catch (e) {
    // yield call(errorHandler, e);
  }
}

function* saveWalletAddress(action) {
  const id = action.payload.client._id;

  const payload = {
    clientType: action.payload.client.clientType,
    storeClientKey: action.payload.walletAddresses.storeClientKey,
    storeClientSecret: action.payload.walletAddresses.storeClientSecret,
    storeUrl: action.payload.walletAddresses.storeUrl,
    walletAddresses: action.payload.walletAddresses.currencies,
  };

  try {
    const url = `/plugins/${id}`;
    yield call(putRequest, url, payload);
    toast.success('Changes on plugin details has been saved');
  } catch (e) {
    toast.error('Plugin Details Error');
  }
}

function* resetApiKey(id) {
  const url = `/plugins/${id.payload}/reset`;

  try {
    const { data } = yield call(putRequest, url);
    yield put({ type: UPDATE_API_KEY, payload: data });
    toast.success('Successfully Reset API Key');
  } catch (e) {
    toast.error('Reset API Key Failed');
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeEvery(GET_INTIMATE_API_CLIENT_ID_FORM, getIntimateAPIClientID);
  yield takeEvery(RESET_INTIMATE_API_ID, resetIntimateAPIIDs);
  yield takeEvery(RESET_INTIMATE_API_ID, resetWoocommerceAPIIDs);
  yield takeEvery(FETCH_CURRENT_USER, fetchCurrentUser);
  yield takeEvery(SAVE_WALLET_ADDRESS, saveWalletAddress);
  yield takeEvery(RESET_API_KEY, resetApiKey);
}
