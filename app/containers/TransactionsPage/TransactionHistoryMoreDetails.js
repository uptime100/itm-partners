import React from 'react';

class TransactionsHistoryMoreDetails extends React.Component {
  render() {
    return (
      <div>
        <div className="">
          <div className="columns">
            <div className="column is-2">
              <p>HH:MM:SS</p>
            </div>
            <div className="column ">
              <p>FROM:</p>
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
              <div className="columns">
                <div className="column">
                  <p className="is-inline">+$233,234.23</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionsHistoryMoreDetails;
