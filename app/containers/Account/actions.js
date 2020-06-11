/*
 *
 * Account actions
 *
 */

import {
  CHANGE_COMPANY_NAME,
  CHANGE_COMPANY_SCREEN_NAME,
  CHANGE_EMAIL,
  CHANGE_COMPANY_WEBSITE,
  CHANGE_COMPANY_DESCRIPTION,
  CHANGE_COMPANY_LOGO,
  EDIT_COMPANY_ACCOUNT,
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_LOGO_MODAL,
  CLOSE_LOGO_MODAL,
  LOAD_COMPANY_DETAILS,
  LOAD_COMPANY_DETAILS_SUCCESS,
  CHANGE_CATEGORIES,
  CATEGORY_TO_CHECK,
  CATEGORY_TO_UNCHECK,
  CHANGE_PLUGINS,
  PLUGINS_TO_CHECK,
  PLUGINS_TO_UNCHECK,
  CHANGE_TARGET_AUDIENCE,
  TARGET_AUDIENCE_TO_CHECK,
  TARGET_AUDIENCE_TO_UNCHECK,
  CHANGE_ACCOUNT_EMAIL,
  EDIT_COMPANY_ACCOUNT_SUCCESS,
  EDIT_COMPANY_ACCOUNT_FAILED,
  CHANGE_LOCAL_TIMEZONE,
  CHANGE_LOCAL_CURRENCY,
  CHANGE_PRIMARY_COUNTRY,
  CHANGE_CURRENCIES_AVAILABLE,
  CURRENCIES_TO_CHECK,
  CURRENCIES_TO_UNCHECK,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
} from './constants';

export function changeCompanyName(payload) {
  return {
    type: CHANGE_COMPANY_NAME,
    payload,
  };
}

export function changeCompanyScreenName(payload) {
  return {
    type: CHANGE_COMPANY_SCREEN_NAME,
    payload,
  };
}

export function changeEmail(payload) {
  return {
    type: CHANGE_EMAIL,
    payload,
  };
}

export function changeCompanyWebsite(payload) {
  return {
    type: CHANGE_COMPANY_WEBSITE,
    payload,
  };
}

export function changeCompanyDescription(payload) {
  return {
    type: CHANGE_COMPANY_DESCRIPTION,
    payload,
  };
}

export function changeAccountEmail(payload) {
  return {
    type: CHANGE_ACCOUNT_EMAIL,
    payload,
  };
}

export function changeCompanyLogo(payload) {
  return {
    type: CHANGE_COMPANY_LOGO,
    payload,
  };
}

export function changeCategories(payload) {
  return {
    type: CHANGE_CATEGORIES,
    payload,
  };
}

export function categoryToCheck(payload) {
  return {
    type: CATEGORY_TO_CHECK,
    payload,
  };
}

export function categoryToUncheck(payload) {
  return {
    type: CATEGORY_TO_UNCHECK,
    payload,
  };
}

export function changePlugins(payload) {
  return {
    type: CHANGE_PLUGINS,
    payload,
  };
}

export function pluginsToCheck(payload) {
  return {
    type: PLUGINS_TO_CHECK,
    payload,
  };
}

export function pluginsToUncheck(payload) {
  return {
    type: PLUGINS_TO_UNCHECK,
    payload,
  };
}

export function changeTargetAudience(payload) {
  return {
    type: CHANGE_TARGET_AUDIENCE,
    payload,
  };
}

export function targetAudienceToCheck(payload) {
  return {
    type: TARGET_AUDIENCE_TO_CHECK,
    payload,
  };
}

export function targetAudienceToUncheck(payload) {
  return {
    type: TARGET_AUDIENCE_TO_UNCHECK,
    payload,
  };
}

export function changeLocalTimezone(payload) {
  return {
    type: CHANGE_LOCAL_TIMEZONE,
    payload,
  };
}

export function changeLocalCurrency(payload) {
  return {
    type: CHANGE_LOCAL_CURRENCY,
    payload,
  };
}

export function changePrimaryCountry(payload) {
  return {
    type: CHANGE_PRIMARY_COUNTRY,
    payload,
  };
}

export function changeCurrenciesAvailable(payload) {
  return {
    type: CHANGE_CURRENCIES_AVAILABLE,
    payload,
  };
}

export function currenciesToCheck(payload) {
  return {
    type: CURRENCIES_TO_CHECK,
    payload,
  };
}

export function currenciesToUncheck(payload) {
  return {
    type: CURRENCIES_TO_UNCHECK,
    payload,
  };
}

export function editCompany(payload) {
  return {
    type: EDIT_COMPANY_ACCOUNT,
    payload,
  };
}

export function editCompanySuccess(payload) {
  return {
    type: EDIT_COMPANY_ACCOUNT_SUCCESS,
    payload,
  };
}

export function editCompanyFailed(payload) {
  return {
    type: EDIT_COMPANY_ACCOUNT_FAILED,
    payload,
  };
}

export function openModal(payload) {
  return {
    type: OPEN_MODAL,
    payload,
  };
}

export function closeModal(payload) {
  return {
    type: CLOSE_MODAL,
    payload,
  };
}

export function openLogoModal(payload) {
  return {
    type: OPEN_LOGO_MODAL,
    payload,
  };
}

export function closeLogoModal(payload) {
  return {
    type: CLOSE_LOGO_MODAL,
    payload,
  };
}

export function loadCompanyDetails(payload) {
  return {
    type: LOAD_COMPANY_DETAILS,
    payload,
  };
}

export function loadCompanyDetailsSuccess(payload) {
  return {
    type: LOAD_COMPANY_DETAILS_SUCCESS,
    payload,
  };
}

export function resetPassword(payload) {
  return {
    type: RESET_PASSWORD,
    payload,
  };
}

export function resetPasswordSuccess(payload) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload,
  };
}
