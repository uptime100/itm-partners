/*
 *
 * CompaniesPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_COMPANY_NAME,
  CHANGE_COMPANY_ROLE,
  CHANGE_EMAIL,
  CHANGE_CONTACT_NAME,
  CHANGE_COMPANY_NAME_INPUT,
  GET_ALL_COMPANIES_SUCCESS,
  ADD_NEW_COMPANY_FAILED,
  GET_ALL_USERS_SUCCESS,
  CHANGE_FIELD,
  ADD_COMPANY_TO_OPTION,
  OPEN_SUSPEND_MODAL,
  CLOSE_SUSPEND_MODAL,
} from './constants';
import { GET_ROLES_SUCCESS } from '../App/constants';

export const initialState = fromJS({
  validationErrors: null,
  companyName: '',
  newCompanyName: '',
  roleId: '',
  email: '',
  name: '',
  roles: [],
  companies: [],
  users: [],
  createMode: false,
  newCompanyOption: null,
  isSuspendOpen: false,
});

function companiesPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COMPANY_NAME:
      return state.set('companyName', action.payload);
    case CHANGE_COMPANY_NAME_INPUT:
      return state.set('newCompanyName', action.payload);
    case CHANGE_COMPANY_ROLE:
      return state.set('roleId', action.payload);
    case CHANGE_EMAIL:
      return state.set('email', action.payload);
    case CHANGE_CONTACT_NAME:
      return state.set('name', action.payload);
    case CHANGE_FIELD:
      return state.set(action.payload.name, action.payload.value);
    case GET_ROLES_SUCCESS:
      return state.set('roles', action.payload);
    case GET_ALL_COMPANIES_SUCCESS:
      return state.set('companies', action.payload);
    case GET_ALL_USERS_SUCCESS:
      return state.set('users', action.payload);
    case ADD_COMPANY_TO_OPTION:
      return state.set('newCompanyOption', {
        label: action.payload,
        value: action.payload,
      });
    case ADD_NEW_COMPANY_FAILED:
      return state.set('validationErrors', action.payload);
    case OPEN_SUSPEND_MODAL:
      return state
        .set('toSuspendCompany', action.payload)
        .set('isSuspendOpen', true);
    case CLOSE_SUSPEND_MODAL:
      return state.set('isSuspendOpen', false);
    default:
      return state;
  }
}

export default companiesPageReducer;
