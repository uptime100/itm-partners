import React from 'react';
import WoocommerceAPIAdminDetailsRow from './WoocommerceAPIAdminDetailsRow';
import PrimaryButton from '../../../components/PrimaryButton';
// import PropTypes from 'prop-types';
// import SecondaryButton from '../../components/SecondaryButton';

class WoocommerceAPIAdminDetails extends React.Component {
  render() {
    return (
      <div>
        <div className="columns">
          <div className="column">
            <div className="columns">
              <div className="column is-4">
                <strong>Display Logo</strong>
              </div>
              <div className="column is-8">Woocommerce logo here</div>
            </div>

            <div className="columns">
              <div className="column is-4">
                <strong>Instructions</strong>
              </div>
              <div className="column is-8">
                <textarea className="textarea">
                  Select your desired crypto, send funds, click proceed.
                </textarea>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="columns has-text-centered">
              <div className="column">
                <p style={{ fontSize: '13px' }}>Order</p>
              </div>
              <div className="column is-2">
                <p style={{ fontSize: '13px' }}>Name</p>
              </div>
              <div className="column">
                <p style={{ fontSize: '13px' }}>Symbol</p>
              </div>
              <div className="column">
                <p style={{ fontSize: '13px' }}>Markup</p>
              </div>
              <div className="column">
                <p
                  style={{
                    fontSize: '13px',
                    position: 'relative',
                    left: '12px',
                  }}
                >
                  Decimals
                </p>
              </div>
              <div className="column">
                <p
                  style={{
                    fontSize: '13px',
                    position: 'relative',
                    left: '10px',
                  }}
                >
                  Confirmation
                </p>
              </div>
              <div className="column">
                <p style={{ fontSize: '13px' }}>Timeout</p>
              </div>
            </div>

            <form>
              <WoocommerceAPIAdminDetailsRow />
              <div className="columns">
                <div className="column has-text-right">
                  <PrimaryButton>ADD CURRENCY</PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default WoocommerceAPIAdminDetails;
