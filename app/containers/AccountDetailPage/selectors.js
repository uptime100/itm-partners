import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the accountDetailPage state domain
 */

const selectAccountDetailPageDomain = state =>
  state.get('accountDetailPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AccountDetailPage
 */

const makeSelectAccountDetailPage = () =>
  createSelector(selectAccountDetailPageDomain, substate => substate.toJS());

export default makeSelectAccountDetailPage;
export { selectAccountDetailPageDomain };
