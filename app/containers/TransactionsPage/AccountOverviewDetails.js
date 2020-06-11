import React from 'react';

class AccountOverviewDetails extends React.Component {
  render() {
    return (
      <div className="columns accountOverviewDetailsRow">
        <div className="column">
          <p>INTIMATE(ITM)</p>
        </div>
        <div className="column">
          <p>+121.28 ITM</p>
        </div>
        <div className="column has-text-centered">
          <p>+121.28 ITM</p>
        </div>
        <div className="column has-text-centered">
          <p>-23,230 ITM</p>
        </div>
        <div className="column has-text-centered">
          <p>+$10021.28 ITM</p>
        </div>
        <div className="column">
          <p>+$233,234.23 @1.142 USD/ITM</p>
        </div>
      </div>
    );
  }
}

export default AccountOverviewDetails;
