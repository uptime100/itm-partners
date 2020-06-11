/**
 *
 * AccountPage
 *
 */

import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

import { withConnect, propTypes } from './connect';

// Components
import AccountDetails from './components/AccountDetails';
import AccountConfigurations from './components/AccountConfigurations';
import Loading from './components/Loading';
import Modal from '../../components/Modal';

import TableUsers from './components/TableUsers';

/* eslint-disable react/prefer-stateless-function */
export class AccountPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: false,
    };
  }

  componentDidMount() {
    this.props.updatePartnerId(this.props.match.params.id);
  }

  submitForm = e => {
    e.preventDefault();
    // const { form } = this.props.accountPage;
    this.props.editPartner();
    this.setState({
      isDisabled: true,
    });
  };

  renderUsersTable = () => {
    let {
      currentPartner,
      toggleSuspendModal,
      setUserToSuspend,
      currentUser,
    } = this.props;
    if (!currentPartner) {
      return <Loading />;
    }

    const { role } = currentUser;
    if (role.level >= 2) {
      return null;
    }

    return (
      <TableUsers
        currentUser={currentUser}
        users={currentPartner.users}
        toggleSuspendModal={toggleSuspendModal}
        setUserToSuspend={setUserToSuspend}
      />
    );
  };

  render() {
    const { isFetchingAccount, accountPage, suspendUser } = this.props;
    const { isDisabled } = this.state;

    const { form } = this.props.accountPage;
    if (!this.props.currentUser) {
      return <Loading />;
    }

    const { email, role } = this.props.currentUser;

    if (isFetchingAccount) {
      return <Loading />;
    }

    return (
      <Fragment>
        <Helmet>
          <title>AccountPage</title>
          <meta name="description" content="Manage Accounts" />
        </Helmet>
        <div className="columns">
          <AccountDetails
            updateName={this.props.updateName}
            updateNameFull={this.props.updateNameFull}
            updatePublicEmail={this.props.updatePublicEmail}
            updateWebsite={this.props.updateWebsite}
            onBlurWebsite={this.props.onBlurWebsite}
            updateDescription={this.props.updateDescription}
            onChangeCompanyLogo={this.props.onChangeCompanyLogo}
            form={form}
          />
          <AccountConfigurations
            form={form}
            currentUserEmail={email}
            role={role}
            updatePlugins={this.props.updatePlugins}
            updateTargetAudience={this.props.updateTargetAudience}
            updateCategories={this.props.updateCategories}
            updateCurrencies={this.props.updateCurrencies}
            resetPassword={this.props.setResetPasswordModal}
            updateLocalPrimaryCountry={this.props.updateLocalPrimaryCountry}
            updateLocalTimeZone={this.props.updateLocalTimeZone}
            updateLocalCurrency={this.props.updateLocalCurrency}
            checkAllbox={this.props.checkAllbox}
            checkAll={this.props.checkAll}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            marginBottom: 24,
          }}
        >
          <button
            className="button is-primary"
            onClick={this.submitForm}
            disabled={isDisabled}
          >
            Save Updates
          </button>
        </div>

        {this.renderUsersTable()}

        <Modal
          visible={this.props.resetPasswordModalShown}
          toggle={this.props.closeModal}
        >
          <p>Are you sure you want to reset password?</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 16,
            }}
          >
            <button
              className="button"
              style={{ marginRight: '4px' }}
              onClick={this.props.closeModal}
            >
              Cancel
            </button>

            <button
              className="button is-primary"
              onClick={this.props.resetPassword}
            >
              Yes
            </button>
          </div>
        </Modal>

        <Modal
          visible={accountPage.suspendModalShown}
          toggle={this.props.closeModal}
        >
          <p>{`Are you sure you want to ${
            accountPage.userToSuspend && accountPage.userToSuspend.isActive
              ? 'suspend'
              : 'activate'
          } this user?`}</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 16,
            }}
          >
            <button
              className="button"
              style={{ marginRight: '4px' }}
              onClick={this.props.closeModal}
            >
              Cancel
            </button>

            <button
              className="button is-primary"
              onClick={() => {
                suspendUser();
              }}
            >
              Yes
            </button>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

AccountPage.propTypes = propTypes;

const withReducer = injectReducer({ key: 'accountPage', reducer });
const withSaga = injectSaga({ key: 'accountPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AccountPage);
