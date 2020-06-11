import { takeEvery, call, put, select } from 'redux-saga/effects';
import {
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_ERROR,
  FETCH_TRANSACTIONS_INIT,
  UPDATE_SORTING,
} from './constants';
import { get } from 'utils/api';
// import { searchTransactionSuccess } from './actions';
// import { toast } from 'react-toastify';

import {
  makeSelectTransactionsFilterForm,
  makeSelectSorting,
  makeSelectTransactions,
  makeSelectLimit,
} from './selectors';

function* fetchTransactions(action) {
  const sorting = yield select(makeSelectSorting());
  const filterForm = yield select(makeSelectTransactionsFilterForm());
  const transactions = yield select(makeSelectTransactions());

  // Get Sort Params
  const sortOptions = [[sorting.column, sorting.value]];
  const sortParams = encodeURI(JSON.stringify(sortOptions));

  // Get Filter Params
  const params = { ...filterForm };
  const filter = {};
  for (const key in params) {
    if (!params[key]) {
      delete params[key];
    }
  }

  if (params.startDate || params.endDate) {
    filter.transactionDate = {};
    if (params.startDate) {
      filter.transactionDate.$gte = params.startDate;
    }
    if (params.endDate) {
      filter.transactionDate.$lte = `${params.endDate} 23:59:59`;
    }
  }

  if (
    params &&
    params.type &&
    params.type.value &&
    params.type.value !== 'all'
  ) {
    filter.type = params.type.value;
    const creditType = filter.type === 'in' ? 'credit' : 'charge';
    if (params.minTotal || params.maxTotal) {
      filter[creditType] = {};
      if (params.minTotal) {
        filter[creditType].$gte = parseFloat(params.minTotal);
      }
      if (params.maxTotal) {
        filter[creditType].$lte = parseFloat(params.maxTotal);
      }
    }
  } else if (params.minTotal || params.maxTotal) {
    filter.amount = {};
    if (params.minTotal) {
      filter.amount.$gte = `${params.minTotal}`;
    }
    if (params.maxTotal) {
      filter.amount.$lte = `${params.maxTotal}`;
    }
  }

  const filterParams = encodeURI(JSON.stringify(filter));

  // Page
  let page = transactions.pagination ? transactions.pagination.page : 1;
  // If action is fetch transaction (passed data is page number)
  if (typeof action.payload === 'number') {
    page = action.payload;
  }

  // Limit
  const limit = yield select(makeSelectLimit());

  try {
    // 1 before network request... set loading = true
    yield put({ type: FETCH_TRANSACTIONS_INIT });

    const url = `/transactions?sort=${sortParams}&filter=${filterParams}&limit=${limit}&page=${page}`;

    // 2 network request
    const { data } = yield call(get, url);
    yield put({ type: FETCH_TRANSACTIONS_SUCCESS, payload: data });
  } catch (err) {
    // yield call(errorHandler, e);
    yield put({ type: FETCH_TRANSACTIONS_ERROR, payload: err });
  }
}

// function* errorHandler(err) {
//   if (!_.isEmpty(err)) {
//     yield put(setError(err));
//   } else {
//     yield put(setError('Something went wrong!'));
//   }
// }

// Individual exports for testing
export default function* defaultSaga() {
  yield takeEvery(FETCH_TRANSACTIONS, fetchTransactions);
  yield takeEvery(UPDATE_SORTING, fetchTransactions);
}
