import { takeEvery, call, put, select } from 'redux-saga/effects';
// import validate from 'validate.js';
import {
  EDIT_COMPANY_ACCOUNT,
  LOAD_COMPANY_DETAILS,
  RESET_PASSWORD,
} from './constants';

import {
  makeSelectCompanyName,
  makeSelectCompanyScreenName,
  makeSelectEmail,
  makeSelectCompanyWebsite,
  makeSelectCompanyDescription,
  makeSelectCompanyLogo,
  makeSelectCompanyId,
  makeSelectCategories,
  makeSelectPlugins,
  makeSelectTargetAudiences,
  makeSelectLocalTimezone,
  makeSelectLocalCurrency,
  makeSelectPrimaryCountry,
  makeSelectCurrenciesAvailable,
  makeSelectAccountEmail,
} from './selectors';
import {
  loadCompanyDetailsSuccess,
  changeCompanyScreenName,
  changeCompanyName,
  changeCompanyDescription,
  changeCategories,
  changePlugins,
  changeTargetAudience,
  changeEmail,
  changeCompanyWebsite,
  changeAccountEmail,
  changeCompanyLogo,
  editCompanySuccess,
  changeLocalTimezone,
  changeLocalCurrency,
  changePrimaryCountry,
  changeCurrenciesAvailable,
  resetPasswordSuccess,
} from './actions';
import { put as putAPI, get, post } from 'utils/api';
import { toast } from 'react-toastify';

function* editAccount() {
  const companyNameFull = yield select(makeSelectCompanyName());
  const companyName = yield select(makeSelectCompanyScreenName());
  const publicEmailAddress = yield select(makeSelectEmail());
  const website = yield select(makeSelectCompanyWebsite());
  const description = yield select(makeSelectCompanyDescription());
  const logoLarge = yield select(makeSelectCompanyLogo());
  const categories = yield select(makeSelectCategories());
  const plugins = yield select(makeSelectPlugins());
  const targetAudience = yield select(makeSelectTargetAudiences());
  const id = yield select(makeSelectCompanyId());
  const localTimezone = yield select(makeSelectLocalTimezone());
  const localCurrency = yield select(makeSelectLocalCurrency());
  const primaryCountry = yield select(makeSelectPrimaryCountry());
  const currencies = yield select(makeSelectCurrenciesAvailable());

  // const constraints = {
  //   companyName: {
  //     presence: true,
  //   },
  // };

  const payload = {
    companyName,
    companyNameFull,
    publicEmailAddress,
    website,
    description,
    logoLarge,
    categories,
    plugins,
    targetAudience,
    localTimezone,
    localCurrency,
    primaryCountry,
    currencies,
  };

  try {
    const url = `/partners/${id}`;
    const { data } = yield call(putAPI, url, payload);
    yield put(editCompanySuccess(data));
    toast.success('Company details successfully updated');
  } catch (e) {
    toast.error('Oooopss!Something went wrong!');
    yield call(e);
  }
}

function* loadCompany() {
  const id = yield select(makeSelectCompanyId());
  try {
    const { data } = yield call(get, `/partners/${id}`);
    yield put(changeCompanyScreenName(data.companyName));
    yield put(changeCompanyName(data.companyNameFull));
    yield put(changeCompanyDescription(data.description));
    yield put(changeCategories(data.categories));
    yield put(loadCompanyDetailsSuccess(data));
    yield put(changePlugins(data.plugins));
    yield put(changeTargetAudience(data.targetAudience));
    yield put(changeEmail(data.publicEmailAddress));
    yield put(changeCompanyWebsite(data.website));
    yield put(changeAccountEmail(data.users[0].email));
    yield put(changeCompanyLogo(data.logoLarge));
    yield put(changeLocalTimezone(data.localTimezone));
    yield put(changeLocalCurrency(data.localCurrency));
    yield put(changePrimaryCountry(data.primaryCountry));
    yield put(changeCurrenciesAvailable(data.currencies));
  } catch (e) {}
}

function* resetAccountPassword() {
  const accountEmail = yield select(makeSelectAccountEmail());
  try {
    const url = `/users/resetPassword`;
    const { data } = yield call(post, url, { email: accountEmail });
    yield put(resetPasswordSuccess(data));
    toast.success('Reset Password requested. Please check your email');
  } catch (e) {
    toast.error('Oooopss!Something went wrong!');
    yield call(e);
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeEvery(EDIT_COMPANY_ACCOUNT, editAccount);
  yield takeEvery(LOAD_COMPANY_DETAILS, loadCompany);
  yield takeEvery(RESET_PASSWORD, resetAccountPassword);
}
