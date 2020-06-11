/*
 *
 * PermissionsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FETCH_ROLES_SUCCESS,
  FETCH_SCOPES_SUCCESS,
  ADD_PERMISSION_SUCCESS,
  REMOVE_PERMISSION_SUCCESS,
} from './constants';

export const initialState = fromJS({
  roles: [],
  scopes: [],
});

function permissionsPageReducer(state = initialState, action) {
  let newRoles;
  switch (action.type) {
    case FETCH_ROLES_SUCCESS:
      return state.set('roles', action.payload);
    case FETCH_SCOPES_SUCCESS:
      return state.set('scopes', action.payload);
    case REMOVE_PERMISSION_SUCCESS:
      newRoles = state.get('roles').map(role => {
        if (role._id === action.payload.data._id) {
          return action.payload.data;
        }
        return role;
      });
      return state.set('roles', newRoles);
    case ADD_PERMISSION_SUCCESS:
      newRoles = state.get('roles').map(role => {
        if (role._id === action.payload.data._id) {
          return action.payload.data;
        }
        return role;
      });
      return state.set('roles', newRoles);
    default:
      return state;
  }
}

export default permissionsPageReducer;
