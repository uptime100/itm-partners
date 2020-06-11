/*
 *
 * DirectoryPage reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  DEFAULT_ACTION,
  UPDATE_ENTITY_TO_ADD,
  LOAD_INITIAL,
  LOAD_INITIAL_SUCCESS,
  LOAD_INITIAL_ERROR,
  UPDATE_FORM,
  ADD_NEW_USER_SUCCESS,
  FETCH_PARTNERS_SUCCESS,
  FETCH_PARTNERS,
  TOGGLE_MODAL,
  SET_PARTNER_TO_SUSPEND,
  SUSPEND_PARTNER_SUCCESS,
  SUSPEND_PARTNER,
  SUSPEND_PARTNER_ERROR,
  SET_EMAIL_TO_RESET,
  CLOSE_RESET_PASSWORD_MODAL,
  SUSPEND_USER_SUCCESS,
  UPDATE_LIMIT,
  SET_SUSPEND_MODAL,
  TOGGLE_SUSPEND_MODAL,
  SUSPEND_USER,
  UPDATE_SORTING,
  FILTER_PARTNERS,
} from './constants';

const initialShape = {
  isAddingPartnerOrUser: false,
  isSuspending: false,
  suspendType: 'suspend',
  partnerToSuspend: null,
  confirmModalShown: false,
  resetPasswordModalShown: false,
  suspendModalShown: false,
  emailToSuspend: null,
  emailToResetPassword: null,
  isPartnerSelected: true, // false if addUser
  partners: {
    data: [],
    pagination: {},
    isFetching: false,
  },
  users: [],
  roles: [],
  isFetchingInitialData: null,
  fetchingInitialError: null,
  addPartnerForm: {
    partnerName: '',
    name: '',
    email: '',
  },
  addUserForm: {
    partner: null, // react-select
    name: '',
    email: '',
    role: null, // react-select
  },
  me: null,
  limit: 25,
  // sorting: { column: '', value: -1 },
  sorting: { column: 'name', value: -1 },
  filter: {
    categories: { label: 'Select Category', value: null },
    plugins: { label: 'Select Plugin', value: null },
    name: '',
  },
};

export const initialState = fromJS(initialShape);

function directoryPageReducer(state = initialState, action) {
  let newPartners;
  let newPartner;
  let newUsers;

  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_INITIAL:
      return state.set('isFetchingInitialData', true);
    case LOAD_INITIAL_SUCCESS:
      return state
        .setIn(['partners', 'pagination'], action.payload.partners.pagination)
        .setIn(['partners', 'data'], action.payload.partners.data)
        .set('roles', action.payload.roles)
        .set('users', action.payload.users)
        .set('me', action.payload.me)
        .set('isFetchingInitialData', false)
        .set('fetchingInitialError', null);
    case LOAD_INITIAL_ERROR:
      return state
        .set('partners', initialShape.partners)
        .set('roles', [])
        .set('isFetchingInitialData', false)
        .set('fetchingInitialError', null);
    case UPDATE_ENTITY_TO_ADD:
      return state.set('isPartnerSelected', action.payload);
    case UPDATE_FORM:
      return state.setIn(
        [action.payload.form, action.payload.name],
        action.payload.value,
      );
    case ADD_NEW_USER_SUCCESS:
      if (Array.isArray(state.get('users'))) {
        const users = [...state.get('users')];
        users.push(action.payload);
        return state.set('users', users).set('isAddingPartnerOrUser', false);
      }
      return state
        .set({
          users: [action.payload],
        })
        .set('isAddingPartnerOrUser', false);

    case FETCH_PARTNERS:
      return state.setIn(['partners', 'isFetching'], true);
    case FETCH_PARTNERS_SUCCESS:
      return state
        .setIn(['partners', 'isFetching'], false)
        .setIn(['partners', 'pagination'], action.payload.pagination)
        .setIn(['partners', 'data'], action.payload.data);
    case TOGGLE_MODAL:
      return state
        .set('confirmModalShown', action.payload)
        .set('resetPasswordModalShown', action.payload);
    case CLOSE_RESET_PASSWORD_MODAL:
      return state.set('resetPasswordModalShown', false);
    case SET_PARTNER_TO_SUSPEND:
      return state
        .set('partnerToSuspend', action.payload.partner)
        .set('suspendType', action.payload.type);
    case SET_EMAIL_TO_RESET:
      return state
        .set('emailToResetPassword', action.payload)
        .set('resetPasswordModalShown', true);
    case SUSPEND_PARTNER:
      return state.set('isSuspending', true);
    case SUSPEND_PARTNER_ERROR:
      return state.set('isSuspending', false);
    case SUSPEND_PARTNER_SUCCESS:
      newPartners = state.get('partners').toJS();
      newPartners.data = newPartners.data.map(partner => {
        newPartner = partner;
        if (newPartner._id === action.payload.id) {
          newPartner.isActive = action.payload.isActive;
        }
        return newPartner;
      });
      return state
        .set('partners', new Map(newPartners))
        .set('isSuspending', false);
    case SUSPEND_USER_SUCCESS:
      newUsers = state.get('users');
      newUsers = newUsers.map(user => {
        const updatedUser = { ...user };
        if (user._id === action.payload._id) {
          updatedUser.isActive = action.payload.isActive;
        }
        return updatedUser;
      });

      return state
        .set('users', newUsers)
        .set('suspendModalShown', false)
        .set('isSuspending', false);
    case UPDATE_LIMIT:
      return state.set('limit', action.payload);
    case SET_SUSPEND_MODAL:
      return state
        .set('emailToSuspend', action.payload.user)
        .set('suspendType', action.payload.type);
    case TOGGLE_SUSPEND_MODAL:
      return state.set('suspendModalShown', action.payload);
    case SUSPEND_USER:
      return state.set('isSuspending', true);

    case UPDATE_SORTING: {
      return state
        .setIn(['sorting', 'column'], action.payload.column)
        .setIn(['sorting', 'value'], action.payload.value);
    }

    case FILTER_PARTNERS: {
      return state.set('filter', action.payload);
    }

    default:
      return state;
  }
}

export default directoryPageReducer;
