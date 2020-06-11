import React from 'react';
import H1 from '../../../components/H1';

import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import WalletAddressForm from './WalletAddressForm';
import intimateLogo from '../../../images/intimate_logo2019/intimate-io-horizontal_blue.svg';

/*
  @title - string
*/

window.Clipboard = ((window, document, navigator) => {
  let el;
  let copy;

  const isOS = () => navigator.userAgent.match(/ipad|iphone/i);

  const createTextArea = text => {
    el = document.createElement('textarea');
    el.value = text;
    el.id = 'copyText';
    el.style.fontSize = '16px';
    document.body.appendChild(el);
  };

  const selectText = () => {
    let range;
    let selection;

    if (isOS()) {
      range = document.createRange();
      range.selectNodeContents(el);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      el.setSelectionRange(0, 999999);
    } else {
      el.select();
    }
  };

  const copyToClipboard = () => {
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  copy = (text, label) => {
    createTextArea(text);
    selectText();
    copyToClipboard();
    if (typeof label === 'string') {
      toast.success(`${label} copied to clipboard!`);
    } else {
      toast.success(`Copied!`);
    }
  };
  return {
    copy,
  };
})(window, document, navigator);

const copyText = (text, label) => {
  window.Clipboard.copy(text, label);
};

class PluginBox extends React.Component {
  render() {
    const { client, saveWalletAddress, title, currentUser } = this.props;

    const clientId = client.client ? client.client.clientId : client.clientId;
    const clientSecret = client.client
      ? client.client.clientSecret
      : client.clientSecret;

    let pluginsTitle = this.props.title;

    switch (title) {
      case 'intimate API':
        pluginsTitle = 'intimate API';
        break;
      case 'woocommerce':
        pluginsTitle = 'WooCommerce';
        break;
      default:
        pluginsTitle = title.charAt(0).toUpperCase() + title.slice(1);
        break;
    }

    return (
      <div className="box">
        <H1>{pluginsTitle}</H1>

        <div className="container columns">
          <div className="input-group column is-5">
            <label htmlFor="clientID">
              <p>Client ID</p>
            </label>
            <input
              type="text"
              id="clientID"
              className="input"
              style={{ marginRight: 20 }}
              placeholder="Client ID"
              value={clientId}
              onChange={() => {}}
              disabled
            />
            <button
              className="button is-primary"
              style={{ marginTop: '36px', right: '-6px' }}
              onClick={() => {
                copyText(clientId, 'Client ID');
              }}
            >
              <i className="fa fa-clipboard" />
            </button>
          </div>

          <div className="input-group column is-5">
            <label htmlFor="clientSecretID">
              <p>Client Secret</p>
            </label>
            <input
              type="text"
              id="clientSecretID"
              className="input"
              style={{ marginRight: 20 }}
              placeholder="Client Secret"
              value={clientSecret}
              onChange={() => {}}
              disabled
            />
            <button
              className="button is-primary"
              style={{ marginTop: '36px', right: '-6px' }}
              onClick={() => {
                copyText(clientSecret, 'Client Secret');
              }}
            >
              <i className="fa fa-clipboard" />
            </button>
          </div>
          {!client.isApiKey && (
            <div className="column is-2">
              <button
                onClick={e => {
                  e.preventDefault();
                  this.props.onSubmitResetApi(client._id);
                }}
                className="button is-primary resetKey"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        <div className="box" style={{ marginTop: 20 }}>
          <div className="columns">
            <div className="column">
              <div className="columns">
                <div className="column is-4">
                  <strong>Display Name</strong>
                </div>
                <div className="column is-8">intimate.io crypto checkout</div>
              </div>
              <div className="columns">
                <div className="column is-4">
                  <strong>Display Logo</strong>
                </div>

                <div className="column is-8">
                  <img
                    style={{ position: 'relative', bottom: '3px' }}
                    src={intimateLogo}
                    width="110px"
                    alt="intimate logo"
                  />
                </div>
              </div>
            </div>

            <div className="column">
              <div className="columns">
                <div className="column">
                  <div className="columns">
                    <div className="column is-8">
                      <strong>Payment Timeout</strong>
                    </div>
                    <div className="column is-4">10mins</div>
                  </div>
                </div>
                <div className="column">
                  <div className="columns">
                    <div className="column is-8">
                      <strong>#Confirmations</strong>
                    </div>
                    <div className="column is-4">2</div>
                  </div>
                </div>
              </div>

              <div className="columns">
                <div className="column is-4">
                  <strong>Checkout Instructions</strong>
                </div>
                <div className="column is-8">
                  Select your desired crypto, send funds, click proceed.
                </div>
              </div>
            </div>
          </div>

          {!client.isApiKey && (
            <div>
              <WalletAddressForm
                client={client}
                clientType={client.clientType}
                storeClientKey={client.storeClientKey}
                storeClientSecret={client.storeClientSecret}
                storeUrl={client.storeUrl}
                onSubmit={saveWalletAddress}
                currentUser={currentUser}
                currencies={client.walletAddresses}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

PluginBox.propTypes = {
  client: PropTypes.any,
  title: PropTypes.string,
  saveWalletAddress: PropTypes.func,
  onSubmitResetApi: PropTypes.func,
  currentUser: PropTypes.any,
};

export default PluginBox;
