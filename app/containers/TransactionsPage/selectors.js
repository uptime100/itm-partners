import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the transactionsPage state domain
 */

const selectTransactionsPageDomain = state =>
  state.get('transactionsPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TransactionsPage
 */

const makeSelectTransactionsPage = () =>
  createSelector(selectTransactionsPageDomain, substate => substate.toJS());

const makeSelectTransactionsFilterForm = () =>
  createSelector(selectTransactionsPageDomain, substate =>
    substate.get('transactionsFilterForm').toJS(),
  );

const makeSelectTransactionsOverviewForm = () =>
  createSelector(selectTransactionsPageDomain, substate =>
    substate.get('overviewForm').toJS(),
  );

const makeSelectTransactions = () =>
  createSelector(selectTransactionsPageDomain, substate =>
    substate.get('transactions').toJS(),
  );

const makeSelectSorting = () =>
  createSelector(selectTransactionsPageDomain, substate =>
    substate.get('sorting').toJS(),
  );

const makeSelectLimit = () =>
  createSelector(selectTransactionsPageDomain, substate =>
    substate.get('limit'),
  );

const makeSelectInitialFetch = () =>
  createSelector(selectTransactionsPageDomain, substate =>
    substate.get('initialFetch'),
  );

export {
  makeSelectTransactionsPage,
  makeSelectTransactionsFilterForm,
  makeSelectTransactionsOverviewForm,
  makeSelectTransactions,
  makeSelectSorting,
  makeSelectLimit,
  makeSelectInitialFetch,
};
