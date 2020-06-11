import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the accountPage state domain
 */

const selectAccountPageDomain = state => state.get('accountPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AccountPage
 */

const makeSelectAccountPage = () =>
  createSelector(selectAccountPageDomain, substate => substate.toJS());

const makeSelectFetchingData = () =>
  createSelector(selectAccountPageDomain, substate =>
    substate.get('isFetchingAccount'),
  );

const makeSelectCheckAllBox = () =>
  createSelector(selectAccountPageDomain, substate => substate.get('checkAll'));

const makeSelectResetModal = () =>
  createSelector(selectAccountPageDomain, substate =>
    substate.get('resetPasswordModalShown'),
  );

const makeSelectCurrentPartner = () =>
  createSelector(selectAccountPageDomain, substate => substate.get('partner'));

export default makeSelectAccountPage;
export {
  selectAccountPageDomain,
  makeSelectFetchingData,
  makeSelectCheckAllBox,
  makeSelectResetModal,
  makeSelectCurrentPartner,
};
