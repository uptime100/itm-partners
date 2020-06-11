/**
 *
 * DirectoryPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Select from 'react-select';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDirectoryPage, { makeSelectSorting } from './selectors';
import reducer from './reducer';
import saga from './saga';

import H1 from '../../components/H1';
import Modal from '../../components/Modal';
import Loading from './Loading';
import AddPartnerForm from './components/AddPartnerForm';
import AddUserForm from './components/AddUserForm';
import TablePartners from './components/TablePartners';
import TableUsers from './components/TableUsers';
import colourStyles from '../../components/KitchenSink/colourStyle2';

import {
  fetchInitialData as _fetchInitialData,
  addNewPartner as _addNewPartner,
  addNewUser as _addNewUser,
  fetchPartners as _fetchPartners,
  toggleModal as _toggleModal,
  setPartnerToSuspend as _setPartnerToSuspend,
  suspendPartner as _suspendPartner,
  updateEntityToAdd,
  setEmailToResetPassword as _setEmailToResetPassword,
  resetPassword as _resetPassword,
  suspendUser as _suspendUser,
  updateLimit as _updateLimit,
  setSuspendUserModal as _setSuspendUserModal,
  toggleSuspendModal as _toggleSuspendModal,
  updateSorting as _updateSorting,
  updateUserRole as _updateUserRole,
  filterPartners as _filterPartners,
} from './actions';
import colourStyle from '../../components/KitchenSink/colourStyle';
import categories from '../../categories.json';

let plugins = ['woocommerce', 'magento', 'custom', 'shopify'];

/* eslint-disable react/prefer-stateless-function */
export class DirectoryPage extends React.Component {
  state = {
    selectedCategory: { label: 'Select Category', value: null },
    selectedPlugin: { label: 'Select Plugin', value: null },
    searchUserQuery: '',
  };

  componentDidMount() {
    this.props.fetchInitialData();
  }

  renderSelectRoles() {
    const { directorypage } = this.props;
    const { roles, me } = directorypage;
    const isSuperAdmin = me.role.slug === 'SUPER_ADMIN';

    return roles
      .filter(role => {
        if (isSuperAdmin) {
          return true;
        }
        return me.role.level < role.level;
      })
      .map(role => ({
        value: role._id,
        label: role.name,
      }));
  }

  renderDirectory() {
    const {
      directorypage,
      fetchPartners,
      setEmailToResetPassword,
      updateUserRole,
    } = this.props;
    const { me, partners, users } = directorypage;

    if (!me) {
      return null;
    }

    const isIntimateUser =
      me.role.slug === 'SUPER_ADMIN' || me.role.slug === 'ADMIN';

    if (isIntimateUser) {
      // render PARTNERS
      if (!partners) {
        return null;
      }

      const limits = [
        { value: 25, label: '25' },
        { value: 50, label: '50' },
        { value: 100, label: '100' },
      ];
      const { limit } = directorypage;
      return (
        <Fragment>
          <div style={{ marginBottom: 10, position: 'relative', zIndex: 10 }}>
            Show
            <div
              style={{
                display: 'inline-block',
                width: 200,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <Select
                className="dropDownSelect"
                styles={colourStyle}
                options={limits}
                value={{ value: limit, label: limit.toString() }}
                onChange={e => {
                  this.props.updateLimit(e.value);
                  fetchPartners(1, e.value);
                }}
              />
            </div>
            items
          </div>
          <TablePartners
            partners={partners}
            me={me}
            fetchPartners={fetchPartners}
            openSuspendPartnerModal={this.openSuspendPartnerModal}
            sorting={this.props.sorting}
            updateSorting={this.props.updateSorting}
          />
        </Fragment>
      );
    }
    // render USERS
    if (!users) {
      return null;
    }

    return (
      <TableUsers
        users={users}
        me={me}
        setEmailToResetPassword={setEmailToResetPassword}
        openSuspendUserModal={this.openSuspendUserModal}
        roles={directorypage.roles}
        updateUserRole={updateUserRole}
      />
    );
  }

  openSuspendPartnerModal = (partner, suspendType) => {
    const { toggleModal, setPartnerToSuspend } = this.props;
    setPartnerToSuspend(partner, suspendType);
    toggleModal(true);
  };

  openSuspendUserModal = (user, suspendType) => {
    const { toggleSuspendModal, setSuspendUserModal } = this.props;
    setSuspendUserModal(user, suspendType);
    toggleSuspendModal(true);
  };

  onFilterSubmit = e => {
    e.preventDefault();

    let { selectedCategory, selectedPlugin, searchUserQuery } = this.state;

    this.props.filterPartners({
      categories: selectedCategory,
      plugins: selectedPlugin,
      name: searchUserQuery,
    });
  };

  handleCategoryChange = e => {
    this.setState({ selectedCategory: e });
  };

  handlePluginChange = e => {
    this.setState({ selectedPlugin: e });
  };

  handleSearchUserChange = e => {
    this.setState({ searchUserQuery: e.target.value });
  };

  renderFilterBox = () => {
    const { directorypage } = this.props;
    const { me } = directorypage;
    const isIntimateUser =
      me.role.slug === 'SUPER_ADMIN' || me.role.slug === 'ADMIN';

    if (!isIntimateUser) {
      return null;
    }

    return (
      <div className="column is-half">
        <form className="box" onSubmit={this.onFilterSubmit}>
          <H1>Filter </H1>
          <div className="columns">
            <div className="column is-half">
              <div className="field">
                <label htmlFor="name">
                  <strong>Category</strong>
                </label>
                <div className="control">
                  <Select
                    options={[
                      { label: 'Select Category', value: null },
                      ...categories.map(category => ({
                        label:
                          category.charAt(0).toUpperCase() +
                          category.substring(1),
                        value: category,
                      })),
                    ]}
                    onChange={this.handleCategoryChange}
                    value={this.state.selectedCategory}
                    className="dropDownSelect"
                    styles={colourStyles}
                  />
                </div>
              </div>
            </div>

            <div className="column is-half">
              <div className="field">
                <label htmlFor="name">
                  <strong>Plugin Type</strong>
                </label>
                <div className="control">
                  <Select
                    options={[
                      { label: 'Select Plugin Type', value: null },
                      ...plugins.map(plugin => ({
                        label:
                          plugin.charAt(0).toUpperCase() + plugin.substring(1),
                        value: plugin,
                      })),
                    ]}
                    onChange={this.handlePluginChange}
                    value={this.state.selectedPlugin}
                    className="dropDownSelect"
                    styles={colourStyles}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="name">
              <strong>Search User</strong>
            </label>
            <div className="control">
              <input
                name="name"
                type="text"
                className="input false"
                autoComplete="off"
                onChange={this.handleSearchUserChange}
                value={this.state.searchUserQuery}
              />
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <button className="button is-primary" onClick={() => {}}>
              Search
            </button>
          </div>
        </form>
      </div>
    );
  };

  render() {
    const {
      directorypage,
      addNewPartner,
      addNewUser,
      toggleModal,
      closeModal,
      suspendPartner,
      resetPassword,
    } = this.props;
    const {
      isPartnerSelected,
      isFetchingInitialData,
      fetchingInitialError,
      me,
      confirmModalShown,
      isSuspending,
      resetPasswordModalShown,
      suspendModalShown,
      suspendType,
    } = directorypage;
    if (isFetchingInitialData || !me) {
      return <Loading />;
    }

    if (fetchingInitialError) {
      return (
        <div className="notification is-danger">An unknown error occured!</div>
      );
    }

    const isIntimateUser =
      me.role.slug === 'SUPER_ADMIN' || me.role.slug === 'ADMIN';

    const AddNewHeading =
      isPartnerSelected && isIntimateUser ? 'Partner' : 'User';

    return (
      <Fragment>
        <Helmet>
          <title>DirectoryPage</title>
          <meta name="description" content="Description of DirectoryPage" />
        </Helmet>

        {me.role.level <= 3 && (
          <div className="columns" style={{ position: 'relative', zIndex: 50 }}>
            {this.renderFilterBox()}
            <div className={`column ${isIntimateUser && 'is-half'}`}>
              <div className="box">
                <H1>Add New {AddNewHeading}</H1>

                {isIntimateUser && (
                  <div className="buttons has-addons">
                    <span
                      className={`button ${isPartnerSelected &&
                        'is-primary is-selected'}`}
                      style={{ width: '50%' }}
                      onClick={this.props.selectAddPartner}
                      role="presentation"
                    >
                      Partner
                    </span>
                    <span
                      className={`button ${!isPartnerSelected &&
                        'is-primary is-selected'}`}
                      style={{ width: '50%' }}
                      onClick={this.props.selectAddUser}
                      role="presentation"
                    >
                      User
                    </span>
                  </div>
                )}

                {isIntimateUser ? (
                  <Fragment>
                    <div
                      style={{ display: isPartnerSelected ? 'block' : 'none' }}
                    >
                      <AddPartnerForm submitHandler={addNewPartner} me={me} />
                    </div>
                    <div
                      style={{ display: !isPartnerSelected ? 'block' : 'none' }}
                    >
                      <AddUserForm
                        roles={this.renderSelectRoles()}
                        submitHandler={addNewUser}
                        me={me}
                      />
                    </div>
                  </Fragment>
                ) : (
                  <div>
                    <AddUserForm
                      roles={this.renderSelectRoles()}
                      submitHandler={addNewUser}
                      me={me}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <section>{this.renderDirectory()}</section>

        {isIntimateUser ? (
          <Modal
            visible={confirmModalShown}
            toggle={toggleModal}
            disabled={isSuspending}
          >
            <p>Are you sure you want to {suspendType} this account?</p>
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
                onClick={closeModal}
                disabled={isSuspending}
              >
                Cancel
              </button>
              <button
                className="button is-primary"
                onClick={suspendPartner}
                disabled={isSuspending}
              >
                Submit
              </button>
            </div>
          </Modal>
        ) : (
          <Modal
            visible={resetPasswordModalShown}
            toggle={toggleModal}
            disabled={isSuspending}
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
                onClick={closeModal}
                disabled={isSuspending}
              >
                Cancel
              </button>
              <button
                className="button is-primary"
                onClick={resetPassword}
                disabled={isSuspending}
              >
                Yes
              </button>
            </div>
          </Modal>
        )}

        <Modal
          visible={suspendModalShown}
          toggle={this.props.closeSuspendModal}
        >
          <p>Are you sure you want to {suspendType} this account?</p>
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
              onClick={this.props.closeSuspendModal}
            >
              Cancel
            </button>
            <button
              className="button is-primary"
              onClick={this.props.suspendUser}
            >
              Submit
            </button>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

DirectoryPage.propTypes = {
  fetchInitialData: PropTypes.func,
  fetchPartners: PropTypes.func,
  toggleModal: PropTypes.func,
  directorypage: PropTypes.object,
  setPartnerToSuspend: PropTypes.func,
  addNewPartner: PropTypes.func,
  addNewUser: PropTypes.func,
  closeModal: PropTypes.func,
  suspendPartner: PropTypes.func,
  selectAddPartner: PropTypes.func,
  selectAddUser: PropTypes.func,
  setEmailToResetPassword: PropTypes.func,
  resetPassword: PropTypes.func,
  suspendUser: PropTypes.func,
  updateLimit: PropTypes.func,
  closeSuspendModal: PropTypes.func,
  setSuspendUserModal: PropTypes.func,
  toggleSuspendModal: PropTypes.func,
  sorting: PropTypes.any,
  updateSorting: PropTypes.func,
  updateUserRole: PropTypes.func,
  filterPartners: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  directorypage: makeSelectDirectoryPage(),
  sorting: makeSelectSorting(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    selectAddPartner: () => {
      dispatch(updateEntityToAdd(true));
    },
    selectAddUser: () => {
      dispatch(updateEntityToAdd(false));
    },
    fetchInitialData: () => {
      dispatch(_fetchInitialData());
    },
    addNewPartner: partnerDetails => {
      dispatch(_addNewPartner(partnerDetails));
    },
    addNewUser: userDetails => {
      dispatch(_addNewUser(userDetails));
    },
    fetchPartners: (page, limit) => {
      dispatch(_fetchPartners(page, limit));
    },
    toggleModal: visibility => {
      dispatch(_toggleModal(visibility));
    },
    closeModal: () => {
      dispatch(_toggleModal(false));
    },
    setPartnerToSuspend: (partner, type) => {
      dispatch(_setPartnerToSuspend(partner, type));
    },
    suspendPartner: () => {
      dispatch(_suspendPartner());
    },
    setEmailToResetPassword: email => {
      dispatch(_setEmailToResetPassword(email));
    },
    resetPassword: () => {
      dispatch(_resetPassword());
    },
    suspendUser: (email, type) => {
      dispatch(_suspendUser(email, type));
    },
    updateLimit: limit => {
      dispatch(_updateLimit(limit));
    },
    setSuspendUserModal: (user, type) => {
      dispatch(_setSuspendUserModal(user, type));
    },
    toggleSuspendModal: visibility => {
      dispatch(_toggleSuspendModal(visibility));
    },
    closeSuspendModal: () => {
      dispatch(_toggleSuspendModal(false));
    },
    updateSorting: sorting => {
      dispatch(_updateSorting(sorting));
    },
    updateUserRole: (userId, roleId) => {
      dispatch(_updateUserRole(userId, roleId));
    },
    filterPartners: form => {
      dispatch(_filterPartners(form));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'directoryPage', reducer });
const withSaga = injectSaga({ key: 'directoryPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DirectoryPage);
