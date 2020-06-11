/*
 *
 * TransactionsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_TRANSACTIONS,
  UPDATE_FILTER_FORM,
  UPDATE_OVERVIEW_FORM,
  FETCH_TRANSACTIONS,
  UPDATE_SORTING,
  UPDATE_LIMIT,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadTransactions(payload) {
  return {
    type: LOAD_TRANSACTIONS,
    payload,
  };
}

export function updateFilterForm(name, value) {
  return {
    type: UPDATE_FILTER_FORM,
    payload: { name, value },
  };
}

export function updateOverviewForm(name, value) {
  return {
    type: UPDATE_OVERVIEW_FORM,
    payload: { name, value },
  };
}

export function fetchTransactions(page) {
  return {
    type: FETCH_TRANSACTIONS,
    payload: page,
  };
}

export function updateSorting(sorting) {
  return {
    type: UPDATE_SORTING,
    payload: sorting,
  };
}

export function updateLimit(limit) {
  return {
    type: UPDATE_LIMIT,
    payload: limit,
  };
}
