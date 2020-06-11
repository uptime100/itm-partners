import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the directoryPage state domain
 */

const selectDirectoryPageDomain = state =>
  state.get('directoryPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by DirectoryPage
 */

const makeSelectDirectoryPage = () =>
  createSelector(selectDirectoryPageDomain, substate => substate.toJS());

const makeSelectSorting = () =>
  createSelector(selectDirectoryPageDomain, substate =>
    substate.get('sorting').toJS(),
  );

export default makeSelectDirectoryPage;
export { selectDirectoryPageDomain, makeSelectSorting };
