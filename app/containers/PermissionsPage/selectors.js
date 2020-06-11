import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the permissionsPage state domain
 */

const selectPermissionsPageDomain = state =>
  state.get('permissionsPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PermissionsPage
 */

const makeSelectPermissionsPage = () =>
  createSelector(selectPermissionsPageDomain, substate => substate.toJS());

export default makeSelectPermissionsPage;
export { selectPermissionsPageDomain };
