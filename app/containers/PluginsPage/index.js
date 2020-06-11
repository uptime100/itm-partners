/**
 *
 * PluginsPage
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
import makeSelectPluginsPage, {
  makeSelectIntimateClientID,
  makeSelectIntimateClientSecretID,
  makeSelectWoocommerceClientID,
  makeSelectWoocommerceClientSecretID,
  makeSelectCurrentUser,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import PluginBox from './components/PluginBox';

import {
  changeIntimateClientID,
  resetIntimateAPIID,
  changeIntimateClientSecretID,
  changeWoocommerceClientID,
  changeWoocommerceClientSecretID,
  resetWoocommerceAPIID,
  fetchCurrentUser,
  saveWalletAddress as _saveWalletAddress,
  onSubmitResetApiKey,
} from './actions';

import Loading from '../DirectoryPage/Loading';

/* eslint-disable react/prefer-stateless-function */
export class PluginsPage extends React.Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  renderPlugins(plugins) {
    const { saveWalletAddress, currentUser, onSubmitResetApi } = this.props;
    return plugins.map((plugin, key) => (
      <PluginBox
        key={key}
        title={plugin.clientType}
        client={plugin}
        saveWalletAddress={saveWalletAddress}
        onSubmitResetApi={onSubmitResetApi}
        currentUser={currentUser}
      />
    ));
  }

  findApiKeyClient = clients => clients.find(client => client.isApiKey);

  render() {
    const { currentUser, saveWalletAddress } = this.props;
    if (!currentUser) {
      return <Loading />;
    }

    const apiKeyClient = this.findApiKeyClient(currentUser.clients);

    return (
      <div>
        <Helmet>
          <title>PluginsPage</title>
          <meta name="description" content="Description of PluginsPage" />
        </Helmet>
        <div className="container plugins">
          <PluginBox
            title="intimate API"
            client={apiKeyClient}
            saveWalletAddress={saveWalletAddress}
            onSubmitResetApi={this.props.onSubmitResetApi}
          />

          {this.renderPlugins(currentUser.plugins)}
        </div>
      </div>
    );
  }
}

PluginsPage.propTypes = {
  fetchCurrentUser: PropTypes.func,
  currentUser: PropTypes.object,
  saveWalletAddress: PropTypes.func,
  onSubmitResetApi: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  pluginspage: makeSelectPluginsPage(),
  intimateClientID: makeSelectIntimateClientID(),
  intimateClientSecretID: makeSelectIntimateClientSecretID(),
  woocommerceClientID: makeSelectWoocommerceClientID(),
  woocommerceClientSecretID: makeSelectWoocommerceClientSecretID(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeIntimateClientID: evt =>
      dispatch(changeIntimateClientID(evt.target.value)),
    onChangeIntimateClientSecretID: evt =>
      dispatch(changeIntimateClientSecretID(evt.target.value)),
    onResetIntimateID: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(resetIntimateAPIID());
    },
    onChangeWoocommerceClientID: evt =>
      dispatch(changeWoocommerceClientID(evt.target.value)),
    onChangeWoocommerceClientSecretID: evt =>
      dispatch(changeWoocommerceClientSecretID(evt.target.value)),
    onResetWoocommerceID: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(resetWoocommerceAPIID());
    },
    fetchCurrentUser: () => {
      dispatch(fetchCurrentUser());
    },
    saveWalletAddress: (client, walletAddresses) => {
      dispatch(_saveWalletAddress(client, walletAddresses));
    },
    onSubmitResetApi: id => {
      dispatch(onSubmitResetApiKey(id));
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'pluginsPage', reducer });
const withSaga = injectSaga({ key: 'pluginsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PluginsPage);
