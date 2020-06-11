import React from 'react';
// import TransactionsHistoryMoreDetails from './TransactionHistoryMoreDetails';
import PropTypes from 'prop-types';
import TransactionHistoryHeader from './TransactionHistory/TransactionHistoryHeader';
import TransactionHistoryRow from './TransactionHistory/TransactionHistoryRow';

class TransactionsHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: false };
    this.handleClick = this.handleClick.bind(this);
  }

  renderTransactions() {
    const { transactions } = this.props;

    if (!transactions || transactions.length === 0) {
      return (
        <div className="columns TransactionsDetailsRow" style={{ padding: 12 }}>
          <p>There are no transactions</p>
        </div>
      );
    }

    return transactions.filter(t => t.conversion).map((t, key) => {
      let amt = t.credit.toString();
      amt = parseInt(amt, 10);
      amt /= 10 ** 18;

      const date = new Date(t.transactionDate);

      return (
        <TransactionHistoryRow
          key={key}
          date={date.toLocaleString()}
          orderId={t.orderId}
          gateway={t.gateway}
          credit={amt}
          charge={t.charge}
          currency={t.currency}
          otherCurrency={t.conversion.name}
          conversionRate={t.conversion.value}
          isOddRow={key % 2 === 1}
        />
      );
    });
  }

  handleClick() {
    this.setState({
      isToggleOn: !this.state.isToggleOn,
    });
  }

  render() {
    const { transactions } = this.props;

    let currency = 'USD';
    try {
      if (transactions && transactions.length > 0) {
        currency = transactions[0].conversion.name;
      }
    } catch (e) {}

    return (
      <div style={{ marginBottom: '10px' }}>
        <TransactionHistoryHeader
          currency={currency}
          sorting={this.props.sorting}
          updateSorting={this.props.updateSorting}
        />

        {this.renderTransactions()}
      </div>
    );
  }
}

TransactionsHistory.propTypes = {
  transactions: PropTypes.array,
  sorting: PropTypes.any,
  updateSorting: PropTypes.func,
};

export default TransactionsHistory;
