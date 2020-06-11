/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { SET_ERROR } from '../CompaniesPage/constants';
import {
  GET_ROLES_SUCCESS,
  GET_CURRENT_USER_SUCCESS,
  SET_IDLE_STATUS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  err: null,
  roles: [],
  isIdle: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return state.set('error', action.payload.message);

    case GET_ROLES_SUCCESS:
      return state.set('roles', action.payload);

    case GET_CURRENT_USER_SUCCESS:
      return state.set('currentUser', action.payload);

    case SET_IDLE_STATUS:
      return state.set('isIdle', action.payload);

    default:
      return state;
  }
}

export default appReducer;
