import React, { Component } from 'react';
import PropTypes from 'prop-types';
import H2 from '../../../components/H2';

let tokens = {
  intimate: 'intimate.io',
  ethereum: 'Ethereum',
  bitcoin: 'Bitcoin',
  'binance-coin': 'Binance Coin',
  omisego: 'OmiseGo',
  funfair: 'FunFair',
  wax: 'Wax',
  spankchain: 'SpankChain',
};

class WalletAddressForm extends Component {
  constructor(props) {
    super(props);

    const {
      storeClientKey = '',
      storeClientSecret = '',
      storeUrl = '',
      currencies = {
        intimate: '',
        ethereum: '',
        bitcoin: '',
        'binance-coin': '',
        omisego: '',
        funfair: '',
        wax: '',
        spankchain: '',
      },
    } = props;

    this.state = {
      storeClientKey,
      storeClientSecret,
      storeUrl,
      currencies,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateState = (key, value) => {
    this.setState({ [key]: value });
  };

  handleSubmit = e => {
    const { onSubmit = () => {}, client } = this.props;
    onSubmit(client, this.state);
    e.preventDefault();
  };

  renderReceivingWalletAddresses = currencies => {
    // Maintain Sorting
    let sortedCurrencies = Object.keys(tokens).filter(c =>
      currencies.includes(c),
    );

    return sortedCurrencies.map((currency, key) => {
      let token = tokens[currency];

      return (
        <div className="column is-half" key={key}>
          <div className="field">
            <label className="label">{token}</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder={`${token} Wallet Address`}
                value={this.state.currencies[currency]}
                onChange={e => {
                  let newCurrencies = { ...this.state.currencies };
                  newCurrencies[currency] = e.target.value;
                  this.setState({ currencies: newCurrencies });
                }}
              />
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    const { storeClientKey, storeClientSecret, storeUrl } = this.state;

    const { client, currentUser } = this.props;

    const pluginsDetailsTitle =
      client.clientType === 'woocommerce'
        ? 'WooCommerce'
        : client.clientType.charAt(0).toUpperCase() +
          client.clientType.slice(1);
    const consumerKey = `${pluginsDetailsTitle} - Consumer Key`;
    const consumerSecret = `${pluginsDetailsTitle} - Consumer Secret`;

    return (
      <form onSubmit={this.handleSubmit}>
        <H2>{pluginsDetailsTitle} Plugin Details</H2>
        <div className="columns is-multiline">
          <div className="column is-half">
            <div className="field">
              <label className="label">{consumerKey}</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder={consumerKey}
                  value={storeClientKey}
                  onChange={e => {
                    this.updateState('storeClientKey', e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field">
              <label className="label">{consumerSecret} </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder={consumerSecret}
                  value={storeClientSecret}
                  onChange={e => {
                    this.updateState('storeClientSecret', e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field">
              <label className="label">Store URL</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Store URL"
                  value={storeUrl}
                  onChange={e => {
                    this.updateState('storeUrl', e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <H2>Receiving Wallet Addresses</H2>
        <div className="columns is-multiline">
          {this.renderReceivingWalletAddresses(currentUser.partner.currencies)}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button className="button is-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }
}

WalletAddressForm.propTypes = {
  client: PropTypes.any,
  onSubmit: PropTypes.func,
  storeClientKey: PropTypes.string,
  storeClientSecret: PropTypes.string,
  storeUrl: PropTypes.string,
  currentUser: PropTypes.any,
  currencies: PropTypes.any,
};

export default WalletAddressForm;
