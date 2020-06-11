import React from 'react';
import PropTypes from 'prop-types';

import TransactionListRow from './TransactionListRow';

class TransactionListBody extends React.Component {
  renderRows(transactions) {
    return transactions.map((transaction, key) => (
      <TransactionListRow
        key={key}
        transaction={transaction}
        classNameCurrency={this.props.classNameCurrency}
        classNameCrypto={this.props.classNameCrypto}
        dropDownToggle={this.props.dropDownToggle}
        dropDownToggleHandler={this.props.dropDownToggleHandler}
        id={this.props.id}
      />
    ));
  }

  render() {
    const { transactions } = this.props;

    if (!transactions) {
      return null;
    }

    if (transactions.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan="8">There are no transactions.</td>
          </tr>
        </tbody>
      );
    }

    return <tbody>{this.renderRows(transactions)}</tbody>;
  }
}

TransactionListBody.propTypes = {
  transactions: PropTypes.array,
  classNameCrypto: PropTypes.string,
  classNameCurrency: PropTypes.string,
  dropDownToggle: PropTypes.bool,
  dropDownToggleHandler: PropTypes.func,
  id: PropTypes.string,
};

export default TransactionListBody;
