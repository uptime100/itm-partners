import React, { Fragment } from 'react';
import TransactionsHistoryMoreDetails from '../TransactionHistoryMoreDetails';
import PropTypes from 'prop-types';

class TransactionHistoryRow extends React.Component {
  /*
    @date - string
    @orderId
    @gateway
    @credit
    @charge
    @currency
    @conversionRate
    @otherCurrency
  */

  state = {
    isOpen: false,
  };

  // toggleOpen() {
  //   this.setState((prevState) => {
  //     return {
  //       isOpen: !prevState.isOpen
  //     }
  //   })
  // }

  // renderToggleButton() {
  //   if (this.state.isOpen) {
  //     return <span>
  //       <i className="fas fa-angle-up" />
  //     </span>
  //   } else {
  //     return <span>
  //       <i className="fas fa-angle-down" />
  //     </span>
  //   }
  // }

  render() {
    const {
      date,
      orderId,
      gateway,
      credit,
      charge,
      currency,
      otherCurrency,
      conversionRate,
      isOddRow,
    } = this.props;

    let otherCurrencyCredit = 0;
    let otherCurrencyCharge = 0;

    let crypto = '';
    if (currency === 'intimate') {
      crypto = 'ITM';
      otherCurrencyCredit =
        (parseFloat(credit) / 600) * parseFloat(conversionRate);
      otherCurrencyCharge =
        (parseFloat(charge) / 600) * parseFloat(conversionRate);
    } else if (currency === 'ether') {
      crypto = 'ETH';
      otherCurrencyCredit = parseFloat(credit) * parseFloat(conversionRate);
      otherCurrencyCharge = parseFloat(charge) * parseFloat(conversionRate);
    }

    return (
      <Fragment>
        <div className={isOddRow ? 'transactions-odd-row' : null}>
          <div className="columns TransactionsDetailsRow">
            <div className="column">
              <p>{date}</p>
            </div>
            <div className="column">
              <p>
                Inv {orderId} - {gateway}
              </p>
            </div>
            <div className="column has-text-centered">
              {credit !== 0 && (
                <p>
                  +{credit} {crypto}
                </p>
              )}
            </div>
            <div className="column has-text-centered">
              {charge !== 0 && (
                <p>
                  -{charge} {crypto}
                </p>
              )}
            </div>
            <div className="column has-text-centered">
              <p>
                {otherCurrencyCredit !== 0 ? (
                  <span>
                    +{otherCurrencyCredit.toFixed(2)} {otherCurrency}
                  </span>
                ) : (
                  <span />
                )}
              </p>
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  {otherCurrencyCharge !== 0 && (
                    <p className="is-inline">
                      -{otherCurrencyCharge.toFixed(2)} {otherCurrency}
                    </p>
                  )}
                </div>
                <div className="column has-text-centered">
                  <button onClick={() => {}}>
                    {/* { this.renderToggleButton() } */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen ? (
          <div className="column">
            <TransactionsHistoryMoreDetails />
          </div>
        ) : null}
      </Fragment>
    );
  }
}

TransactionHistoryRow.propTypes = {
  date: PropTypes.string,
  orderId: PropTypes.string,
  gateway: PropTypes.string,
  credit: PropTypes.number,
  charge: PropTypes.number,
  currency: PropTypes.string,
  otherCurrency: PropTypes.string,
  conversionRate: PropTypes.string,
  isOddRow: PropTypes.bool,
};

export default TransactionHistoryRow;
