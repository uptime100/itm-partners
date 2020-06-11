/**
 *
 * Account
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import AccountDetails from './AccountDetails';
import AccountConfigurations from './AccountConfigurations';
import AccountResetPassModal from './AccountResetPassModal';
import PrimaryButton from '../../components/PrimaryButton';

import {
  makeSelectCompanyName,
  makeSelectCompanyScreenName,
  makeSelectEmail,
  makeSelectCompanyWebsite,
  makeSelectCompanyDescription,
  makeSelectCompanyLogo,
  makeSelectOpenModal,
  makeSelectOpenLogoModal,
  makeSelectCategories,
  makeSelectPlugins,
  makeSelectTargetAudiences,
  makeSelectAccountEmail,
  makeSelectLocalTimezone,
  makeSelectLocalCurrency,
  makeSelectPrimaryCountry,
  makeSelectCurrenciesAvailable,
} from './selectors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  changeCompanyName,
  changeCompanyScreenName,
  changeCompanyWebsite,
  changeEmail,
  changeCompanyDescription,
  changeCompanyLogo,
  changeLocalTimezone,
  changeLocalCurrency,
  changePrimaryCountry,
  openModal,
  closeModal,
  editCompany,
  openLogoModal,
  closeLogoModal,
  loadCompanyDetails,
  categoryToCheck,
  categoryToUncheck,
  pluginsToCheck,
  pluginsToUncheck,
  targetAudienceToCheck,
  targetAudienceToUncheck,
  currenciesToCheck,
  currenciesToUncheck,
  resetPassword,
} from './actions';
import AccountChangeLogoModal from './AccountChangeLogoModal';

/* eslint-disable react/prefer-stateless-function */
export class Account extends React.Component {
  componentDidMount() {
    this.props.loadCompanyDetails(this.props.match.params.id);
  }
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="mobilePadding">
            <Helmet>
              <title>Account</title>
              <meta name="description" content="Description of Account" />
            </Helmet>
            <div className="columns">
              <div className="column is-6">
                <AccountDetails
                  companyName={this.props.companyName}
                  companyScreenName={this.props.companyScreenName}
                  email={this.props.email}
                  website={this.props.website}
                  description={this.props.description}
                  logo={this.props.logo}
                  isOpen={this.props.isOpen}
                  isOpenLogo={this.props.isOpenLogo}
                  onClickOpenLogoModal={this.props.onClickOpenLogoModal}
                  onClickOpenModal={this.props.onClickOpenModal}
                  onChangeCompanyName={this.props.onChangeCompanyName}
                  onChangeCompanyScreenName={
                    this.props.onChangeCompanyScreenName
                  }
                  onChangeEmail={this.props.onChangeEmail}
                  onChangeWebsite={this.props.onChangeWebsite}
                  onChangeDescription={this.props.onChangeDescription}
                  onChangeCompanyLogo={this.props.onChangeCompanyLogo}
                  onEditAccount={this.props.onEditAccount}
                />
              </div>
              <div className="column is-6">
                <AccountConfigurations
                  onClickOpenModal={this.props.onClickOpenModal}
                  categories={this.props.categories}
                  onCategoryClicked={this.props.onCategoryClicked}
                  targetAudiences={this.props.targetAudiences}
                  plugins={this.props.plugins}
                  onPluginClicked={this.props.onPluginClicked}
                  onTargetAudienceClicked={this.props.onTargetAudienceClicked}
                  accountEmail={this.props.accountEmail}
                  localTimezone={this.props.localTimezone}
                  onChangeLocalTimezone={this.props.onChangeLocalTimezone}
                  localCurrency={this.props.localCurrency}
                  onChangeLocalCurrency={this.props.onChangeLocalCurrency}
                  primaryCountry={this.props.primaryCountry}
                  onChangePrimaryCountry={this.props.onChangePrimaryCountry}
                  currencies={this.props.currencies}
                  onCurrenciesClicked={this.props.onCurrenciesClicked}
                />
              </div>
            </div>
          </div>
          <div
            className="actionPanel"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '1rem',
            }}
          >
            <PrimaryButton onClick={this.props.onEditAccount}>
              Save Updates
            </PrimaryButton>
          </div>
        </div>
        <AccountResetPassModal
          isOpen={this.props.isOpen}
          onClickCloseModal={this.props.onClickCloseModal}
          onClickResetPassword={this.props.onClickResetPassword}
          accountEmail={this.props.accountEmail}
        />
        <AccountChangeLogoModal
          isOpenLogo={this.props.isOpenLogo}
          onClickCloseLogoModal={this.props.onClickCloseLogoModal}
        />

        <ToastContainer />
      </React.Fragment>
    );
  }
}

Account.propTypes = {
  companyName: PropTypes.string,
  companyScreenName: PropTypes.string,
  email: PropTypes.string,
  website: PropTypes.string,
  description: PropTypes.string,
  isOpen: PropTypes.bool,
  isOpenLogo: PropTypes.bool,
  logo: PropTypes.string,
  localTimezone: PropTypes.string,
  localCurrency: PropTypes.string,
  primaryCountry: PropTypes.string,
  onChangeLocalTimezone: PropTypes.func,
  onChangeLocalCurrency: PropTypes.func,
  onChangePrimaryCountry: PropTypes.func,
  onChangeCompanyName: PropTypes.func,
  onChangeCompanyScreenName: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangeWebsite: PropTypes.func,
  onChangeDescription: PropTypes.func,
  onChangeCompanyLogo: PropTypes.func,
  onClickOpenModal: PropTypes.func,
  onClickCloseModal: PropTypes.func,
  onClickOpenLogoModal: PropTypes.func,
  onClickCloseLogoModal: PropTypes.func,
  onEditAccount: PropTypes.func,
  categories: PropTypes.array,
  onCategoryClicked: PropTypes.func,
  plugins: PropTypes.array,
  targetAudiences: PropTypes.array,
  currencies: PropTypes.array,
  onCurrenciesClicked: PropTypes.func,
  onPluginClicked: PropTypes.func,
  onTargetAudienceClicked: PropTypes.func,
  accountEmail: PropTypes.string,
  loadCompanyDetails: PropTypes.func,
  onClickResetPassword: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  companyName: makeSelectCompanyName(),
  companyScreenName: makeSelectCompanyScreenName(),
  email: makeSelectEmail(),
  website: makeSelectCompanyWebsite(),
  description: makeSelectCompanyDescription(),
  logo: makeSelectCompanyLogo(),
  isOpen: makeSelectOpenModal(),
  isOpenLogo: makeSelectOpenLogoModal(),
  categories: makeSelectCategories(),
  plugins: makeSelectPlugins(),
  targetAudiences: makeSelectTargetAudiences(),
  accountEmail: makeSelectAccountEmail(),
  localTimezone: makeSelectLocalTimezone(),
  localCurrency: makeSelectLocalCurrency(),
  primaryCountry: makeSelectPrimaryCountry(),
  currencies: makeSelectCurrenciesAvailable(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeCompanyName: evt => dispatch(changeCompanyName(evt.target.value)),
    onChangeCompanyScreenName: evt =>
      dispatch(changeCompanyScreenName(evt.target.value)),
    onChangeEmail: evt => dispatch(changeEmail(evt.target.value)),
    onChangeWebsite: evt => dispatch(changeCompanyWebsite(evt.target.value)),
    onChangeDescription: evt =>
      dispatch(changeCompanyDescription(evt.target.value)),
    onChangeCompanyLogo: url => dispatch(changeCompanyLogo(url)),
    onChangeLocalTimezone: evt => dispatch(changeLocalTimezone(evt.value)),
    onChangeLocalCurrency: evt => dispatch(changeLocalCurrency(evt.value)),
    onChangePrimaryCountry: evt => dispatch(changePrimaryCountry(evt.value)),
    onClickOpenModal: evt => {
      dispatch(openModal(evt.preventDefault()));
    },
    onClickCloseModal: evt => dispatch(closeModal(evt.preventDefault())),
    onClickOpenLogoModal: evt => dispatch(openLogoModal(evt.preventDefault())),
    onClickCloseLogoModal: evt =>
      dispatch(closeLogoModal(evt.preventDefault())),
    onEditAccount: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(editCompany());
    },
    loadCompanyDetails: id => {
      dispatch(loadCompanyDetails(id));
    },
    onCategoryClicked: evt => {
      if (evt.target.checked) {
        dispatch(categoryToCheck(evt.target.value));
      } else {
        dispatch(categoryToUncheck(evt.target.value));
      }
    },
    onPluginClicked: evt => {
      if (evt.target.checked) {
        dispatch(pluginsToCheck(evt.target.value));
      } else {
        dispatch(pluginsToUncheck(evt.target.value));
      }
    },
    onTargetAudienceClicked: evt => {
      if (evt.target.checked) {
        dispatch(targetAudienceToCheck(evt.target.value));
      } else {
        dispatch(targetAudienceToUncheck(evt.target.value));
      }
    },

    onCurrenciesClicked: evt => {
      if (evt.target.checked) {
        dispatch(currenciesToCheck(evt.target.value));
      } else {
        dispatch(currenciesToUncheck(evt.target.value));
      }
    },

    onClickResetPassword: evt => {
      evt.preventDefault();
      dispatch(resetPassword(evt.value));
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'account', reducer });
const withSaga = injectSaga({ key: 'account', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Account);
