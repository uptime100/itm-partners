/*
 *
 * PluginsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_INTIMATE_API_CLIENT_ID,
  CHANGE_INTIMATE_API_CLIENT_SECRET_ID,
  CHANGE_WOOCOMMERCE_API_CLIENT_ID,
  CHANGE_WOOCOMMERCE_API_CLIENT_SECRET_ID,
  UPDATE_CURRENT_USER,
  UPDATE_API_KEY,
} from './constants';

export const initialState = fromJS({
  currentUser: null,
});

function pluginsPageReducer(state = initialState, action) {
  const currentUser = { ...state.get('currentUser') };
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_INTIMATE_API_CLIENT_ID:
      return state.set('intimateClientID', action.payload);
    case CHANGE_INTIMATE_API_CLIENT_SECRET_ID:
      return state.set('intimateClientSecretID', action.payload);
    case CHANGE_WOOCOMMERCE_API_CLIENT_ID:
      return state.set('woocommerceClientID', action.payload);
    case CHANGE_WOOCOMMERCE_API_CLIENT_SECRET_ID:
      return state.set('woocommerceClientSecretID', action.payload);
    case UPDATE_CURRENT_USER:
      return state.set('currentUser', action.payload);
    case UPDATE_API_KEY:
      currentUser.plugins = currentUser.plugins.map(plugin => {
        if (plugin._id === action.payload._id) {
          return action.payload;
        }
        return plugin;
      });

      return state.set('currentUser', currentUser);
    default:
      return state;
  }
}

export default pluginsPageReducer;
