/**
 *
 * CompaniesPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { ToastContainer } from 'react-toastify';
import {
  makeSelectCompanyName,
  makeSelectEmailAddress,
  makeSelectRole,
  makeSelectContactName,
  makeSelectRoles,
  makeSelectCompanyNameInput,
  makeSelectAllCompanies,
  makeSelectValidationErrors,
  makeSelectCurrentUser,
  makeSelectAllUsers,
  makeSelectCreateMode,
  makeSelectNewCompanyOption,
  makeSelectOpenSuspendModal,
  makeSelectToSuspendCompany,
} from './selectors';
import { makeSelectError } from '../App/selectors';

import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import AddNewCompanyPanel from './AddNewCompanyPanel';
import CompaniesFilter from './CompaniesFilter';
import CompaniesDetails from './CompaniesDetails';
import UsersTable from './UsersTable';
import {
  changeCompanyName,
  changeRoleId,
  changeEmail,
  addNewCompany,
  changeContactName,
  changeCompanyNameInput,
  getAllCompanies,
  addNewCompanyFailed,
  changeField,
  addToCompanyOption,
  openSuspendModal,
  closeSuspendModal,
  SuspendCompany,
} from './actions';
import { getRoles } from '../App/actions';
import 'react-toastify/dist/ReactToastify.css';
import SuspendModal from './SuspendModal';

/* eslint-disable react/prefer-stateless-function */
export class CompaniesPage extends React.Component {
  componentDidMount() {
    this.props.getRoles();
    this.props.resetForm();
    this.props.getCompanies();
  }

  render() {
    let role = 'PARTNER';
    let companiesFilter;
    let resultTable;
    try {
      role = this.props.currentUser.role.slug;
      if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
        companiesFilter = <CompaniesFilter />;
        resultTable = (
          <CompaniesDetails
            companies={this.props.companies}
            onClickOpenSuspendModal={this.props.onClickOpenSuspendModal}
          />
        );
      } else {
        resultTable = <UsersTable users={this.props.users} />;
      }
    } catch (e) {}

    return (
      <div>
        <Helmet>
          <title>CompaniesPage</title>
          <meta name="description" content="Description of CompaniesPage" />
        </Helmet>
        <div className="container">
          <div className="columns mobileCompanies">
            <div className="column">{companiesFilter}</div>
            <div className="column">
              <AddNewCompanyPanel
                email={this.props.email}
                roleId={this.props.roleId}
                companyName={this.props.companyName}
                companyNameInput={this.props.companyNameInput}
                companies={this.props.companies}
                name={this.props.name}
                roles={this.props.roles}
                onChangeCompanyName={this.props.onChangeCompanyName}
                onChangeCompanyNameInput={this.props.onChangeCompanyNameInput}
                onChangeRoleId={this.props.onChangeRoleId}
                onChangeEmail={this.props.onChangeEmail}
                onChangeContactName={this.props.onChangeContactName}
                onAddNewCompany={this.props.onAddNewCompany}
                validationErrors={this.props.validationErrors}
                currentUser={this.props.currentUser}
                createMode={this.props.createMode}
                onCreateCompany={this.props.onCreateCompany}
                newCompanyOption={this.props.newCompanyOption}
              />
            </div>
          </div>

          <div className="columns mobileCompanies">
            <div className="column is-12">{resultTable}</div>
          </div>
        </div>

        <SuspendModal
          companies={this.props.companies}
          isSuspendOpen={this.props.isSuspendOpen}
          toSuspendCompany={this.props.toSuspendCompany}
          onClickSuspendCompany={this.props.onClickSuspendCompany}
          onClickCloseSuspendModal={this.props.onClickCloseSuspendModal}
        />

        <ToastContainer />
      </div>
    );
  }
}

CompaniesPage.propTypes = {
  email: PropTypes.string,
  roleId: PropTypes.string,
  companyName: PropTypes.string,
  companyNameInput: PropTypes.string,
  companies: PropTypes.array,
  users: PropTypes.array,
  name: PropTypes.string,
  roles: PropTypes.array,
  toSuspendCompany: PropTypes.string,
  onClickSuspendCompany: PropTypes.func,
  isSuspendOpen: PropTypes.bool,
  onChangeContactName: PropTypes.func,
  onChangeCompanyNameInput: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangeRoleId: PropTypes.func,
  onChangeCompanyName: PropTypes.func,
  onAddNewCompany: PropTypes.func,
  onClickOpenSuspendModal: PropTypes.func,
  onClickCloseSuspendModal: PropTypes.func,
  getRoles: PropTypes.func,
  getCompanies: PropTypes.func,
  validationErrors: PropTypes.object,
  resetForm: PropTypes.func,
  currentUser: PropTypes.object,
  onCreateCompany: PropTypes.func,
  createMode: PropTypes.bool,
  newCompanyOption: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmailAddress(),
  roleId: makeSelectRole(),
  companyName: makeSelectCompanyName(),
  companyNameInput: makeSelectCompanyNameInput(),
  companies: makeSelectAllCompanies(),
  users: makeSelectAllUsers(),
  name: makeSelectContactName(),
  roles: makeSelectRoles(),
  errors: makeSelectError(),
  validationErrors: makeSelectValidationErrors(),
  currentUser: makeSelectCurrentUser(),
  createMode: makeSelectCreateMode(),
  newCompanyOption: makeSelectNewCompanyOption(),
  isSuspendOpen: makeSelectOpenSuspendModal(),
  toSuspendCompany: makeSelectToSuspendCompany(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeCompanyName: evt => dispatch(changeCompanyName(evt.value)),
    onChangeCompanyNameInput: evt => {
      dispatch(changeCompanyNameInput(evt));
    },
    onChangeRoleId: evt => {
      dispatch(changeRoleId(evt.value));
    },
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    onChangeContactName: evt => dispatch(changeContactName(evt.target.value)),
    onAddNewCompany: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(addNewCompany());
    },
    onCreateCompany: evt => {
      dispatch(changeField('createMode', true));
      dispatch(addToCompanyOption(evt));
    },
    getRoles: () => {
      dispatch(getRoles());
    },
    getCompanies: () => {
      dispatch(getAllCompanies());
    },
    resetForm: () => {
      dispatch(addNewCompanyFailed(null));
    },
    onClickOpenSuspendModal: evt => {
      dispatch(openSuspendModal(evt.target.dataset.company));
    },

    onClickSuspendCompany: evt => {
      evt.preventDefault();
      dispatch(SuspendCompany(evt.value));
    },

    onClickCloseSuspendModal: evt =>
      dispatch(closeSuspendModal(evt.preventDefault())),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'companiesPage', reducer });
const withSaga = injectSaga({ key: 'companiesPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CompaniesPage);
