import React from 'react';
// import PropTypes from 'prop-types';
// import SecondaryButton from '../../components/SecondaryButton';
import IntimateAPIAdminDetailsRow from './intimateAPIAdminDetailsRow';
import PrimaryButton from '../../../components/PrimaryButton';

class IntimateAPIAdminDetails extends React.Component {
  render() {
    return (
      <div>
        <div className="columns">
          <div className="column">
            <div className="columns">
              <div className="column is-4">
                <strong>Display Logo</strong>
              </div>
              <div className="column is-8">intimate logo here</div>
            </div>

            <div className="columns">
              <div className="column is-4">
                <strong>Instructions</strong>
              </div>
              <div className="column is-8">
                <textarea
                  className="textarea"
                  value="Select your desired crypto, send funds, click proceed."
                />
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
              <IntimateAPIAdminDetailsRow />
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

export default IntimateAPIAdminDetails;
