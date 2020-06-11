/*
 *
 * AccountPage actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_ACCOUNT_FORM,
  LOAD_INITIAL,
  EDIT_PARTNER_ACCOUNT_SUCCESS,
  EDIT_PARTNER_ACCOUNT_FAILED,
  EDIT_PARTNER_ACCOUNT,
  RESET_PASSWORD,
  CHECK_ALL_BOX,
  SET_RESET_PASSWORD_MODAL,
  CLOSE_MODAL,
  SET_USER_TO_SUSPEND,
  TOGGLE_SUSPEND_MODAL,
  SUSPEND_USER,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateAccountForm(name, value) {
  return {
    type: UPDATE_ACCOUNT_FORM,
    payload: {
      name,
      value,
    },
  };
}

export function fetchInitialData() {
  return {
    type: LOAD_INITIAL,
  };
}

export function editPartner(payload) {
  return {
    type: EDIT_PARTNER_ACCOUNT,
    payload,
  };
}

export function editPartnerSuccess(payload) {
  return {
    type: EDIT_PARTNER_ACCOUNT_SUCCESS,
    payload,
  };
}

export function editPartnerFailed(payload) {
  return {
    type: EDIT_PARTNER_ACCOUNT_FAILED,
    payload,
  };
}

export function resetPassword() {
  return {
    type: RESET_PASSWORD,
  };
}

export function checkboxAll(payload) {
  return {
    type: CHECK_ALL_BOX,
    payload,
  };
}

export function setResetPasswordModal() {
  return {
    type: SET_RESET_PASSWORD_MODAL,
  };
}

export function setUserToSuspend(user) {
  return {
    type: SET_USER_TO_SUSPEND,
    payload: user,
  };
}

export function toggleSuspendModal(visible) {
  return {
    type: TOGGLE_SUSPEND_MODAL,
    payload: visible,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}

export function suspendUser() {
  return {
    type: SUSPEND_USER,
  };
}
