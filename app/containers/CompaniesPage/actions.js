/*
 *
 * CompaniesPage actions
 *
 */

import {
  DEFAULT_ACTION,
  ADD_NEW_COMPANY,
  ADD_NEW_COMPANY_SUCCESS,
  ADD_NEW_COMPANY_FAILED,
  CHANGE_EMAIL,
  CHANGE_COMPANY_ROLE,
  CHANGE_CONTACT_NAME,
  CHANGE_COMPANY_NAME,
  SET_ERROR,
  CHANGE_COMPANY_NAME_INPUT,
  GET_ALL_COMPANIES,
  GET_ALL_COMPANIES_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS,
  CHANGE_FIELD,
  ADD_COMPANY_TO_OPTION,
  OPEN_SUSPEND_MODAL,
  CLOSE_SUSPEND_MODAL,
  SUSPEND_COMPANY,
  SUSPEND_COMPANY_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addNewCompany(payload) {
  return {
    type: ADD_NEW_COMPANY,
    payload,
  };
}

export function addNewCompanySuccess(payload) {
  return {
    type: ADD_NEW_COMPANY_SUCCESS,
    payload,
  };
}

export function addNewCompanyFailed(payload) {
  return {
    type: ADD_NEW_COMPANY_FAILED,
    payload,
  };
}

export function getAllCompanies() {
  return {
    type: GET_ALL_COMPANIES,
  };
}

export function getAllCompaniesSuccess(payload) {
  return {
    type: GET_ALL_COMPANIES_SUCCESS,
    payload,
  };
}

export function getAllUsers() {
  return {
    type: GET_ALL_USERS,
  };
}

export function getAllUsersSuccess(payload) {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload,
  };
}

export function changeEmail(payload) {
  return {
    type: CHANGE_EMAIL,
    payload,
  };
}

export function changeRoleId(payload) {
  return {
    type: CHANGE_COMPANY_ROLE,
    payload,
  };
}

export function changeContactName(payload) {
  return {
    type: CHANGE_CONTACT_NAME,
    payload,
  };
}

export function changeCompanyName(payload) {
  return {
    type: CHANGE_COMPANY_NAME,
    payload,
  };
}

export function changeCompanyNameInput(payload) {
  return {
    type: CHANGE_COMPANY_NAME_INPUT,
    payload,
  };
}

export function changeField(name, value) {
  return {
    type: CHANGE_FIELD,
    payload: { name, value },
  };
}

export function addToCompanyOption(payload) {
  return {
    type: ADD_COMPANY_TO_OPTION,
    payload,
  };
}

export function setError(payload) {
  return {
    type: SET_ERROR,
    payload,
  };
}

export function openSuspendModal(payload) {
  return {
    type: OPEN_SUSPEND_MODAL,
    payload,
  };
}

export function closeSuspendModal(payload) {
  return {
    type: CLOSE_SUSPEND_MODAL,
    payload,
  };
}

export function SuspendCompany(payload) {
  return {
    type: SUSPEND_COMPANY,
    payload,
  };
}

export function SuspendCompanySuccess(payload) {
  return {
    type: SUSPEND_COMPANY_SUCCESS,
    payload,
  };
}
