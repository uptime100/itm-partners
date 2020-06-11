/*
 *
 * AccountDetailPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, FETCH_INITIAL_DATA_SUCCESS } from './constants';

export const initialState = fromJS({
  partner: null,
});

function accountDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_INITIAL_DATA_SUCCESS:
      return state.set('partner', action.payload);
    default:
      return state;
  }
}

export default accountDetailPageReducer;
