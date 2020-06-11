/*
 *
 * AccountDetailPage actions
 *
 */

import { DEFAULT_ACTION, FETCH_INITIAL_DATA } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchInitialData(partnerId) {
  return {
    type: FETCH_INITIAL_DATA,
    payload: partnerId,
  };
}
