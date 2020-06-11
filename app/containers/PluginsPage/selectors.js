import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pluginsPage state domain
 */

const selectPluginsPageDomain = state => state.get('pluginsPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PluginsPage
 */

const makeSelectPluginsPage = () =>
  createSelector(selectPluginsPageDomain, substate => substate.toJS());

const makeSelectIntimateClientID = () =>
  createSelector(selectPluginsPageDomain, substate =>
    substate.get('intimateClientID'),
  );

const makeSelectCurrentUser = () =>
  createSelector(selectPluginsPageDomain, substate =>
    substate.get('currentUser'),
  );

const makeSelectIntimateClientSecretID = () =>
  createSelector(selectPluginsPageDomain, substate =>
    substate.get('intimateClientSecretID'),
  );

const makeSelectWoocommerceClientID = () =>
  createSelector(selectPluginsPageDomain, substate =>
    substate.get('woocommerceClientID'),
  );

const makeSelectWoocommerceClientSecretID = () =>
  createSelector(selectPluginsPageDomain, substate =>
    substate.get('woocommerceClientID'),
  );

export default makeSelectPluginsPage;
export {
  selectPluginsPageDomain,
  makeSelectIntimateClientID,
  makeSelectIntimateClientSecretID,
  makeSelectWoocommerceClientID,
  makeSelectWoocommerceClientSecretID,
  makeSelectCurrentUser,
};
