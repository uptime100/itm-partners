import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import makeSelectAccountPage, {
  makeSelectFetchingData,
  makeSelectCheckAllBox,
  makeSelectResetModal,
  makeSelectCurrentPartner,
} from './selectors';
import { makeSelectCurrentUser } from '../App/selectors';

import {
  updateAccountForm as _updateAccountForm,
  fetchInitialData as _fetchInitialData,
  resetPassword as _resetPassword,
  editPartner as _editPartner,
  setResetPasswordModal as _setResetPasswordModal,
  closeModal as _closeModal,
  checkboxAll,
  toggleSuspendModal as _toggleSuspendModal,
  setUserToSuspend as _setUserToSuspend,
  suspendUser as _suspendUser,
} from './actions';

const mapStateToProps = createStructuredSelector({
  accountPage: makeSelectAccountPage(),
  isFetchingAccount: makeSelectFetchingData(),
  checkAll: makeSelectCheckAllBox(),
  resetPasswordModalShown: makeSelectResetModal(),
  currentUser: makeSelectCurrentUser(),
  currentPartner: makeSelectCurrentPartner(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateName: e => {
      dispatch(_updateAccountForm('name', e.target.value));
    },
    updateNameFull: e => {
      dispatch(_updateAccountForm('nameFull', e.target.value));
    },
    updatePublicEmail: e => {
      dispatch(_updateAccountForm('publicEmailAddress', e.target.value));
    },
    updateWebsite: e => {
      dispatch(_updateAccountForm('website', e.target.value));
    },
    onBlurWebsite: e => {
      const text = e.target.value;

      if (text) {
        const hasProtocol =
          text.indexOf('http://') === 0 || text.indexOf('https://') === 0;
        if (!hasProtocol) {
          dispatch(_updateAccountForm('website', `https://${text}`));
        }
      }
    },
    updateDescription: e => {
      dispatch(_updateAccountForm('description', e.target.value));
    },
    updateAccountEmail: e => {
      dispatch(_updateAccountForm('accountEmail', e.target.value));
    },
    updatePartnerId: id => {
      dispatch(_updateAccountForm('_id', id));
      dispatch(_fetchInitialData());
    },
    updatePlugins: plugins => {
      dispatch(_updateAccountForm('plugins', plugins));
    },
    updateTargetAudience: audiences => {
      dispatch(_updateAccountForm('targetAudience', audiences));
    },
    updateCategories: categories => {
      dispatch(_updateAccountForm('categories', categories));
    },
    updateCurrencies: currencies => {
      dispatch(_updateAccountForm('currencies', currencies));
    },
    updateLocalCurrency: data => {
      dispatch(_updateAccountForm('localCurrency', data));
    },
    updateLocalTimeZone: tz => {
      dispatch(_updateAccountForm('localTimezone', tz));
    },
    updateLocalPrimaryCountry: country => {
      dispatch(_updateAccountForm('primaryCountry', country));
    },
    onChangeCompanyLogo: logoLarge => {
      dispatch(_updateAccountForm('logoLarge', logoLarge));
    },
    resetPassword: () => {
      dispatch(_resetPassword());
    },
    editPartner: () => {
      dispatch(_editPartner());
    },
    checkAllbox: check => {
      dispatch(checkboxAll(check));
    },
    setResetPasswordModal: () => {
      dispatch(_setResetPasswordModal());
    },
    closeModal: () => {
      dispatch(_closeModal());
    },
    toggleSuspendModal: visible => {
      dispatch(_toggleSuspendModal(visible));
    },
    setUserToSuspend: user => {
      dispatch(_setUserToSuspend(user));
    },
    suspendUser: () => {
      dispatch(_suspendUser());
    },
  };
}

export const propTypes = {
  dispatch: PropTypes.func,
  updateCompanyScreenName: PropTypes.func,
  updateCompanyName: PropTypes.func,
  updatePublicEmail: PropTypes.func,
  updateWebsite: PropTypes.func,
  updateDescription: PropTypes.func,
  updateAccountEmail: PropTypes.func,
  updatePartnerId: PropTypes.func,
  accountPage: PropTypes.object,
  updatePlugins: PropTypes.func,
  updateTargetAudience: PropTypes.func,
  updateCategories: PropTypes.func,
  onChangeCompanyLogo: PropTypes.func,
  onBlurWebsite: PropTypes.func,
  setResetPasswordModal: PropTypes.func,
  closeModal: PropTypes.func,
  currentPartner: PropTypes.object,
};

export const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
