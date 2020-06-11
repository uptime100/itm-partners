/*
 *
 * AccountPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_ACCOUNT_FORM,
  LOAD_INITIAL,
  CHECK_ALL_BOX,
  SET_RESET_PASSWORD_MODAL,
  CLOSE_MODAL,
  RESET_PASSWORD,
  SET_CURRENT_PARTNER,
  SET_USER_TO_SUSPEND,
  TOGGLE_SUSPEND_MODAL,
  SUSPEND_USER_SUCCESS,
} from './constants';

export const initialState = fromJS({
  form: {
    _id: '',
    companyScreenName: '',
    companyName: '',
    publicEmailAddress: '',
    accountEmail: '',
    website: '',
    description: '',
    categories: [],
    plugins: [],
    targetAudience: [],
    primaryCountry: 'US',
    localCurrency: 'USD',
    localTimezone: 'America/Edmonton',
    currencies: [],
    logoLarge: '',
    name: '',
    nameFull: '',
  },
  partner: null,
  isModalOpen: false,
  modalAction: 'reset', // reset (password) | suspend
  isFetchingAccount: false,
  isSaving: false,
  checkAll: false,
  resetPasswordModalShown: false,
  userToSuspend: null,
  suspendModalShown: false,
});

function accountPageReducer(state = initialState, action) {
  let toCheckAll;
  switch (action.type) {
    case LOAD_INITIAL:
      return state.set('isFetchingAccount', true);

    case CHECK_ALL_BOX:
      toCheckAll = ['gay', 'trans', 'straight', 'lgbtiq'];
      if (!action.payload) {
        return state
          .set('checkAll', true)
          .setIn(['form', 'targetAudience'], toCheckAll);
      }

      return state.set('checkAll', false).setIn(['form', 'targetAudience'], []);

    case UPDATE_ACCOUNT_FORM:
      return state
        .setIn(['form', action.payload.name], action.payload.value)
        .set('isFetchingAccount', false);

    case SET_RESET_PASSWORD_MODAL:
      return state.set('resetPasswordModalShown', true);
    case CLOSE_MODAL: {
      return state
        .set('resetPasswordModalShown', false)
        .set('suspendModalShown', false);
    }
    case RESET_PASSWORD: {
      return state.set('resetPasswordModalShown', false);
    }
    case SET_CURRENT_PARTNER: {
      return state.set('partner', action.payload);
    }
    case SET_USER_TO_SUSPEND: {
      return state.set('userToSuspend', action.payload);
    }
    case TOGGLE_SUSPEND_MODAL: {
      return state.set('suspendModalShown', action.payload);
    }
    case SUSPEND_USER_SUCCESS: {
      let newPartners = state.get('partner');
      let newUsers = newPartners.users.map(user => {
        let newUser = { ...user };
        if (newUser._id === action.payload._id) {
          newUser.isActive = !newUser.isActive;
        }
        return newUser;
      });

      newPartners.users = newUsers;

      return state
        .set('partner', newPartners)
        .set('suspendModalShown', false)
        .set('userToSuspend', null);
    }
    default:
      return state;
  }
}

export default accountPageReducer;
