/*
 *
 * DirectoryPage actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_ENTITY_TO_ADD,
  LOAD_INITIAL,
  UPDATE_FORM,
  ADD_NEW_PARTNER,
  ADD_NEW_USER,
  FETCH_PARTNERS,
  TOGGLE_MODAL,
  SET_PARTNER_TO_SUSPEND,
  SUSPEND_PARTNER,
  SET_EMAIL_TO_RESET,
  RESET_PASSWORD,
  SUSPEND_USER,
  UPDATE_LIMIT,
  SET_SUSPEND_MODAL,
  TOGGLE_SUSPEND_MODAL,
  UPDATE_SORTING,
  UPDATE_USER_ROLE,
  FILTER_PARTNERS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateEntityToAdd(isPartnerSelected) {
  return {
    type: UPDATE_ENTITY_TO_ADD,
    payload: isPartnerSelected,
  };
}

export function fetchInitialData() {
  return {
    type: LOAD_INITIAL,
  };
}

export function updateForm(form, name, value) {
  return {
    type: UPDATE_FORM,
    payload: {
      form,
      name,
      value,
    },
  };
}

export function addNewPartner(partnerDetails) {
  return {
    type: ADD_NEW_PARTNER,
    payload: partnerDetails,
  };
}

export function addNewUser(userDetails) {
  return {
    type: ADD_NEW_USER,
    payload: userDetails,
  };
}

export function fetchPartners(page = 1, limit = 8) {
  return {
    type: FETCH_PARTNERS,
    payload: {
      page,
      limit,
    },
  };
}

export function toggleModal(visibility) {
  return {
    type: TOGGLE_MODAL,
    payload: visibility,
  };
}

export function setPartnerToSuspend(partner, type) {
  return {
    type: SET_PARTNER_TO_SUSPEND,
    payload: {
      partner,
      type,
    },
  };
}

export function suspendPartner() {
  return {
    type: SUSPEND_PARTNER,
  };
}

export function setEmailToResetPassword(email) {
  return {
    type: SET_EMAIL_TO_RESET,
    payload: email,
  };
}

export function resetPassword() {
  return {
    type: RESET_PASSWORD,
  };
}

export function suspendUser(email, type) {
  return {
    type: SUSPEND_USER,
    payload: {
      email,
      type,
    },
  };
}

export function updateLimit(limit) {
  return {
    type: UPDATE_LIMIT,
    payload: limit,
  };
}

export function setSuspendUserModal(user, type) {
  return {
    type: SET_SUSPEND_MODAL,
    payload: {
      user,
      type,
    },
  };
}

export function toggleSuspendModal(visibility) {
  return {
    type: TOGGLE_SUSPEND_MODAL,
    payload: visibility,
  };
}

export function updateSorting(sorting) {
  return {
    type: UPDATE_SORTING,
    payload: sorting,
  };
}

export function updateUserRole(userId, roleId) {
  return {
    type: UPDATE_USER_ROLE,
    payload: {
      userId,
      roleId,
    },
  };
}

export function filterPartners(form) {
  return {
    type: FILTER_PARTNERS,
    payload: form,
  };
}
