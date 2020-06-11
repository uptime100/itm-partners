import React from 'react';
import PropTypes from 'prop-types';
import getSymbolFromCurrency from 'currency-symbol-map';
import Config from 'utils/getEnvConfig';
import thousands from 'thousands';

class TransactionListRow extends React.Component {
  render() {
    const {
      transaction,
      dropDownToggle,
      dropDownToggleHandler,
      id,
    } = this.props;

    const requestDate = new Date(transaction.requestDate);
    const transactionDate = new Date(transaction.transactionDate);

    const {
      gateway,
      orderId,
      charge,
      conversion,
      currency,
      totals,
      credit,
      transactionHash,
      gasPrice,
      cryptoAmountInfo,
    } = transaction;

    let otherCurrencyCharge = 0;
    let otherCurrency = '';
    if (conversion) {
      otherCurrency = conversion.name;
      switch (currency) {
        case 'intimate':
          otherCurrencyCharge =
            (parseFloat(charge) / 600) * parseFloat(conversion.value);
          break;
        case 'ether':
          otherCurrencyCharge =
            parseFloat(charge) * parseFloat(conversion.value);
          break;
        default:
          break;
      }
    }

    const symbols = {
      intimate: 'ITM',
      ether: 'ETH',
      litecoin: 'LITECOIN',
      bitcoin: 'BTC',
      'bitcoin cash': 'BCH',
    };

    const etherscanLink = `${Config.ETHERSCAN_URL}/tx/${transactionHash}`;
    const etherscanHref = transactionHash ? (
      <p>
        <strong>Transaction Details: </strong>{' '}
        <a href={etherscanLink} target="_blank">
          {etherscanLink}
        </a>
      </p>
    ) : null;

    const panel =
      gasPrice && gasPrice > 0 ? (
        <tr
          className={dropDownToggle && transaction._id === id ? '' : 'hidden'}
        >
          <td colSpan={4} className="tdMobile">
            <p>
              <strong>Gas Price: </strong> {thousands(gasPrice)} wei
            </p>
            {etherscanHref}
          </td>
          <td colSpan={4} className="is-hidden-mobile" />
        </tr>
      ) : (
        <tr
          className={dropDownToggle && transaction._id === id ? '' : 'hidden'}
        >
          <td colSpan={8}>
            <strong>N/A</strong>
          </td>
        </tr>
      );
    const { classNameCurrency, classNameCrypto } = this.props;

    return (
      <React.Fragment>
        <tr>
          <td className="transaction-date">
            {transactionDate.toLocaleString().replace(/,/, '')}
          </td>
          <td className="is-hidden-mobile">
            {requestDate.toLocaleString().replace(/,/, '')}
          </td>
          <td className="is-hidden-mobile">
            Inv {orderId} {gateway && ` - ${gateway}`}{' '}
          </td>

          <td className={classNameCrypto}>
            {!transactionHash ? (
              <span>Pending</span>
            ) : (
              <span>
                {thousands(credit)}{' '}
                {cryptoAmountInfo ? cryptoAmountInfo.symbol : symbols[currency]}
              </span>
            )}
          </td>

          <td className={classNameCrypto}>
            {charge !== 0 ? thousands(charge) : ''}
          </td>

          <td className={classNameCurrency}>
            {!transactionHash ? (
              <span />
            ) : (
              <span>
                {totals && <span>${thousands(totals.total)} USD</span>}
              </span>
            )}
          </td>

          <td className={classNameCurrency}>
            {otherCurrencyCharge !== 0 && (
              <span>
                - {getSymbolFromCurrency(`${otherCurrency}`)}
                {thousands(otherCurrencyCharge.toFixed(2))} {otherCurrency}
              </span>
            )}
          </td>

          <td className="has-text-centered">
            <button
              className="button is-primary"
              onClick={() => {
                dropDownToggleHandler(transaction._id);
              }}
            >
              <span
                style={{
                  transform: dropDownToggle ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <i className="fa fa-caret-down" />
              </span>
            </button>
          </td>
        </tr>
        {panel}
      </React.Fragment>
    );
  }
}

TransactionListRow.propTypes = {
  transaction: PropTypes.object,
  classNameCrypto: PropTypes.string,
  classNameCurrency: PropTypes.string,
  dropDownToggle: PropTypes.bool,
  dropDownToggleHandler: PropTypes.func,
  id: PropTypes.string,
};

export default TransactionListRow;
