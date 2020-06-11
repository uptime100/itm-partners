/*
 *
 * TransactionsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_FILTER_FORM,
  UPDATE_OVERVIEW_FORM,
  FETCH_TRANSACTIONS_INIT,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_ERROR,
  UPDATE_SORTING,
  UPDATE_LIMIT,
} from './constants';

export const initialState = fromJS({
  transactionsFilterForm: {
    // account: '',
    maxTotal: '',
    minTotal: '',
    type: 'all',
    query: '',
    startDate: null,
    endDate: null,
  },
  overviewForm: {
    dateRangeFrom: null,
    dateRangeTo: null,
  },
  transactions: {
    data: [],
    isFetching: false,
    error: null,
    pagination: null,
  },
  sorting: { column: 'transactionDate', value: -1 },
  limit: 25,
  initialFetch: true,
});

function transactionsPageReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTER_FORM: {
      const { name, value } = action.payload;
      return state.setIn(['transactionsFilterForm', name], value);
    }
    case UPDATE_OVERVIEW_FORM: {
      const { name, value } = action.payload;
      return state.setIn(['overviewForm', name], value);
    }
    case FETCH_TRANSACTIONS_INIT: {
      return state.setIn(['transactions', 'isFetching'], true);
    }
    case FETCH_TRANSACTIONS_SUCCESS: {
      const transactions = action.payload.docs;
      const {
        page,
        totalDocs: count,
        limit,
        totalPages: pageCount,
      } = action.payload;

      let startCount = 1;
      startCount = (page - 1) * limit + 1;
      let endCount = page * limit;
      endCount = endCount > count ? count : endCount;

      const pagination = {
        page,
        count,
        pageCount,
        startCount,
        endCount,
      };

      return state
        .setIn(['transactions', 'isFetching'], false)
        .setIn(['transactions', 'data'], transactions)
        .setIn(['transactions', 'pagination'], pagination)
        .setIn(['transactions', 'error'], null)
        .set('initialFetch', false);
    }
    case FETCH_TRANSACTIONS_ERROR: {
      return state
        .setIn(['transactions', 'isFetching'], false)
        .setIn(['transactions', 'transactions'], [])
        .setIn(['transactions', 'pagination'], null)
        .setIn(['transactions', 'error'], action.payload);
    }
    case UPDATE_SORTING: {
      return state
        .setIn(['sorting', 'column'], action.payload.column)
        .setIn(['sorting', 'value'], action.payload.value)
        .setIn(['transactions', 'pagination'], { page: 1 });
    }
    case UPDATE_LIMIT:
      return state.set('limit', action.payload);
    default:
      return state;
  }
}

export default transactionsPageReducer;
