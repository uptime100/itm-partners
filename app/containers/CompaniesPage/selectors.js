import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the companiesPage state domain
 */

const selectCompaniesPageDomain = state =>
  state.get('companiesPage', initialState);

const selectGlobal = state => state.get('global');

// const selectGlobal = state => state.get('global');

/**
 * Other specific selectors
 */

/**
 * Default selector used by CompaniesPage
 */

const makeSelectCompaniesPage = () =>
  createSelector(selectCompaniesPageDomain, substate => substate.toJS());

const makeSelectEmailAddress = () =>
  createSelector(selectCompaniesPageDomain, substate => substate.get('email'));

const makeSelectCompanyName = () =>
  createSelector(selectCompaniesPageDomain, substate =>
    substate.get('companyName'),
  );

const makeSelectCompanyNameInput = () =>
  createSelector(selectCompaniesPageDomain, substate =>
    substate.get('newCompanyName'),
  );

const makeSelectRole = () =>
  createSelector(selectCompaniesPageDomain, substate => substate.get('roleId'));

const makeSelectContactName = () =>
  createSelector(selectCompaniesPageDomain, substate => substate.get('name'));

const makeSelectRoles = () =>
  createSelector(selectCompaniesPageDomain, substate => substate.get('roles'));

const makeSelectAllCompanies = () =>
  createSelector(selectCompaniesPageDomain, substate =>
    substate.get('companies'),
  );

const makeSelectCreateMode = () =>
  createSelector(selectCompaniesPageDomain, substate =>
    substate.get('createMode'),
  );

const makeSelectNewCompanyOption = () =>
  createSelector(selectCompaniesPageDomain, substate =>
    substate.get('newCompanyOption'),
  );

const makeSelectAllUsers = () =>
  createSelector(selectCompaniesPageDomain, substate => substate.get('users'));

const makeSelectValidationErrors = () =>
  createSelector(selectCompaniesPageDomain, substate =>
    substate.get('validationErrors'),
  );

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, substate => substate.get('currentUser'));

const makeSelectOpenSuspendModal = () =>
  createSelector(selectCompaniesPageDomain, substate =>
    substate.get('isSuspendOpen'),
  );

const makeSelectToSuspendCompany = () =>
  createSelector(selectCompaniesPageDomain, substate =>
    substate.get('toSuspendCompany'),
  );

export default makeSelectCompaniesPage;
export {
  selectCompaniesPageDomain,
  makeSelectEmailAddress,
  makeSelectCompanyName,
  makeSelectRole,
  makeSelectContactName,
  makeSelectRoles,
  makeSelectCompanyNameInput,
  makeSelectAllCompanies,
  makeSelectAllUsers,
  makeSelectValidationErrors,
  makeSelectCurrentUser,
  makeSelectCreateMode,
  makeSelectNewCompanyOption,
  makeSelectOpenSuspendModal,
  makeSelectToSuspendCompany,
};
