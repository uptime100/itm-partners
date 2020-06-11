import React from 'react';
import H1 from '../../components/H1';
import AccountOverviewDetails from './AccountOverviewDetails';
import PropTypes from 'prop-types';

class AccountOverview extends React.Component {
  render() {
    return (
      <div>
        <H1>Account Overview(Month to date)</H1>
        <div className="columns">
          <div className="column is-2">
            <label htmlFor="accountDateRangeFrom">DATE RANGE FROM</label>
            <input
              type="date"
              className="input"
              name="accountDateRangeFrom"
              placeholder="SELECT DATE"
              value={this.props.overviewForm.accountDateRangeFrom}
              onChange={this.props.onOverviewDateRangeFromChange}
            />
          </div>
          <div className="column is-2">
            <label htmlFor="accountDateRangeTo">DATE RANGE TO</label>
            <input
              type="date"
              className="input"
              name="accountDateRangeTo"
              placeholder="SELECT DATE"
              value={this.props.overviewForm.accountDateRangeTo}
              onChange={this.props.onOverviewDateRangeToChange}
            />
          </div>
        </div>
        <div className="accountOverviewTable">
          <div className="columns accountOverviewDetails">
            <div className="column">
              <p>ACCOUNT</p>
            </div>
            <div className="column">
              <p>OPENING BALANCE</p>
            </div>
            <div className="column has-text-centered">
              <div className="reverseArrow">
                <span>
                  <i className="fas fa-sign-in-alt" />
                </span>
              </div>
              <p className="is-inline-block">IN</p>
            </div>
            <div className="column has-text-centered">
              <div className="outArrow">
                <span>
                  <i className="fas fa-sign-in-alt" />
                </span>
              </div>
              <p className="is-inline-block">OUT</p>
            </div>
            <div className="column has-text-centered">
              <p>CRYPTO BAL</p>
            </div>
            <div className="column">
              <p>USD BALANCE</p>
            </div>
          </div>
        </div>

        <div className="alternateColor">
          <AccountOverviewDetails />
          <AccountOverviewDetails />
          <AccountOverviewDetails />
          <div className="columns accountOverviewDetailsRow">
            <div className="column is-2">
              <p>SUBTOTAL</p>
            </div>
            <div className="column is-8">
              <p>+134,134.28 USD</p>
            </div>
            <div className="column is-2">
              <p>+$134,134.28 USD</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AccountOverview.propTypes = {
  overviewForm: PropTypes.object,
  onOverviewDateRangeFromChange: PropTypes.func,
  onOverviewDateRangeToChange: PropTypes.func,
};

export default AccountOverview;
