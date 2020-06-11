import React from 'react';
// import PropTypes from 'prop-types';
// import SecondaryButton from '../../components/SecondaryButton';
import PrimaryButton from '../../../components/PrimaryButton';

class IntimateAPIDetails extends React.Component {
  render() {
    const currenciesAddress = [
      { value: 'intimate', label: 'intimate' },
      { value: 'ethereum', label: 'Ethereum' },
      { value: 'bitcoin', label: 'bitcoin' },
      { value: 'bitcoin cash', label: 'bitcoin cash' },
      { value: 'litecoin', label: 'litecoin' },
    ];

    const currenciesAddressList = currenciesAddress.map(address => {
      const addressPlaceholder = `${address.value} wallet address`;
      return (
        <div className="column is-6">
          <div className="columns is-multiline">
            <div className="column is-4">
              <strong>{address.label} receiving address</strong>
            </div>
            <div className="column is-8">
              <input
                className="input"
                type="text"
                placeholder={addressPlaceholder}
              />
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="box">
        <form>
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
                <div className="column is-8">intimate logo here</div>
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

              {/* <div className="columns">
                <div className="column is-4"><strong>Ethereum receiving address</strong></div>
                <div className="column is-8">
                  <input
                    className="input"
                    type="text"
                    placeholder="ethereum wallet address"
                  />
                </div>
              </div> */}
            </div>
          </div>

          <div className="columns is-multiline">{currenciesAddressList}</div>

          <div className="columns">
            <div className="column has-text-right">
              <PrimaryButton>Save</PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default IntimateAPIDetails;
