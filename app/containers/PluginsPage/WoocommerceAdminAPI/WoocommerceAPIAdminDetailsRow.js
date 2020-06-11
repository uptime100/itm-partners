import React from 'react';
// import PropTypes from 'prop-types';
// import SecondaryButton from '../../components/SecondaryButton';

class WoocommerceAPIAdminDetailsRow extends React.Component {
  render() {
    const currenciesTable = [
      {
        order: 1,
        name: 'intimate',
        symbol: 'ITM',
        markUp: 1,
        decimals: 2,
        confirmation: 2,
        timeOut: 10,
      },
      {
        order: 2,
        name: 'ethereum',
        symbol: 'ETH',
        markUp: 1,
        decimals: 2,
        confirmation: 2,
        timeOut: 10,
      },
    ];

    const currenciesTableRow = currenciesTable.map(row => (
      <div className="columns">
        <div className="column">
          <input
            type="number"
            className="input"
            placeholder="1"
            value={row.order}
          />
        </div>
        <div className="column is-2">
          <input
            type="text"
            className="input"
            placeholder="name"
            value={row.name}
          />
        </div>
        <div className="column">
          <input
            type="text"
            className="input"
            placeholder="symbol"
            value={row.symbol}
          />
        </div>
        <div className="column">
          <input
            type="number"
            className="input"
            placeholder="%"
            value={row.markUp}
          />
        </div>
        <div className="column">
          <input
            type="number"
            className="input"
            placeholder="2"
            value={row.decimals}
          />
        </div>
        <div className="column">
          <input
            type="number"
            className="input"
            placeholder="2"
            value={row.confirmation}
          />
        </div>
        <div className="column">
          <input
            type="number"
            className="input"
            placeholder="mins"
            value={row.timeOut}
          />
        </div>
      </div>
    ));

    return <div>{currenciesTableRow}</div>;
  }
}

export default WoocommerceAPIAdminDetailsRow;
