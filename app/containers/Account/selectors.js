import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the account state domain
 */

const selectAccountDomain = state => state.get('account', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Account
 */

const makeSelectAccount = () =>
  createSelector(selectAccountDomain, substate => substate.toJS());

const makeSelectCompanyName = () =>
  createSelector(selectAccountDomain, substate => substate.get('companyName'));

const makeSelectCompanyScreenName = () =>
  createSelector(selectAccountDomain, substate =>
    substate.get('companyScreenName'),
  );

const makeSelectEmail = () =>
  createSelector(selectAccountDomain, substate => substate.get('email'));

const makeSelectCompanyWebsite = () =>
  createSelector(selectAccountDomain, substate => substate.get('website'));

const makeSelectCompanyDescription = () =>
  createSelector(selectAccountDomain, substate => substate.get('description'));

const makeSelectCompanyLogo = () =>
  createSelector(selectAccountDomain, substate => substate.get('logo'));

const makeSelectOpenModal = () =>
  createSelector(selectAccountDomain, substate => substate.get('isOpen'));

const makeSelectOpenLogoModal = () =>
  createSelector(selectAccountDomain, substate => substate.get('isOpenLogo'));

const makeSelectCompanyId = () =>
  createSelector(selectAccountDomain, substate => substate.get('companyId'));

const makeSelectCategories = () =>
  createSelector(selectAccountDomain, substate => substate.get('categories'));

const makeSelectLocalTimezone = () =>
  createSelector(selectAccountDomain, substate =>
    substate.get('localTimezone'),
  );

const makeSelectLocalCurrency = () =>
  createSelector(selectAccountDomain, substate =>
    substate.get('localCurrency'),
  );

const makeSelectPrimaryCountry = () =>
  createSelector(selectAccountDomain, substate =>
    substate.get('primaryCountry'),
  );

const makeSelectPlugins = () =>
  createSelector(selectAccountDomain, substate => substate.get('plugins'));

const makeSelectTargetAudiences = () =>
  createSelector(selectAccountDomain, substate =>
    substate.get('targetAudiences'),
  );

const makeSelectCurrenciesAvailable = () =>
  createSelector(selectAccountDomain, substate => substate.get('currencies'));

const makeSelectAccountEmail = () =>
  createSelector(selectAccountDomain, substate => substate.get('accountEmail'));

export default makeSelectAccount;
export {
  selectAccountDomain,
  makeSelectCompanyName,
  makeSelectCompanyScreenName,
  makeSelectEmail,
  makeSelectCompanyWebsite,
  makeSelectCompanyDescription,
  makeSelectCompanyLogo,
  makeSelectOpenModal,
  makeSelectOpenLogoModal,
  makeSelectCompanyId,
  makeSelectCategories,
  makeSelectPlugins,
  makeSelectTargetAudiences,
  makeSelectAccountEmail,
  makeSelectLocalTimezone,
  makeSelectLocalCurrency,
  makeSelectPrimaryCountry,
  makeSelectCurrenciesAvailable,
};
