import React from 'react';
import PropTypes from 'prop-types';

class TransactionHistoryHeader extends React.PureComponent {
  updateSorting = columnName => {
    const { sorting } = this.props;
    this.props.updateSorting({
      column: columnName,
      value: sorting.column === columnName ? sorting.value * -1 : -1,
    });
  };

  renderHeader = columnName => {
    const { sorting } = this.props;
    if (sorting.column === columnName) {
      if (sorting.value === 1) {
        return <span style={{ fontWeight: 'bolder' }}> &uarr; </span>;
      }
      return <span style={{ fontWeight: 'bolder' }}> &darr; </span>;
    }
    return null;
  };

  render() {
    const { sorting, currency = 'USD' } = this.props;
    const { column } = sorting;
    return (
      <div className="accountOverviewTable">
        <div className="columns accountOverviewDetails">
          <div
            className={`column hoverable${column === 'transactionDate' &&
              ' active-sorting-column'}`}
            onClick={() => {
              this.updateSorting('transactionDate');
            }}
            role="presentation"
          >
            <p className="column-header-p">
              DATE {this.renderHeader('transactionDate')}
            </p>
          </div>
          <div
            className={`column hoverable${column === 'orderId' &&
              ' active-sorting-column'}`}
            onClick={() => {
              this.updateSorting('orderId');
            }}
            role="presentation"
          >
            <p className="column-header-p">
              DETAILS {this.renderHeader('orderId')}
            </p>
          </div>
          <div
            className={`has-text-centered column hoverable${column ===
              'credit' && ' active-sorting-column'}`}
            onClick={() => {
              this.updateSorting('credit');
            }}
            role="presentation"
          >
            <div className="reverseArrow">
              <span>
                <i className="fas fa-sign-in-alt" />
              </span>
            </div>
            <p className="column-header-p is-inline-block">
              IN CRYPTO {this.renderHeader('credit')}
            </p>
          </div>
          <div className="column has-text-centered">
            <div className="outArrow">
              <span>
                <i className="fas fa-sign-out-alt" />
              </span>
            </div>
            <p className="is-inline-block">OUT CRYPTO</p>
          </div>
          <div className="column has-text-centered">
            <div className="reverseArrow">
              <span>
                <i className="fas fa-sign-out-alt" />
              </span>
            </div>
            <p className="is-inline-block">IN {currency}</p>
          </div>
          <div className="column">
            <div className="outArrow">
              <span>
                <i className="fas fa-sign-out-alt" />
              </span>
            </div>
            <p className="is-inline-block">OUT {currency}</p>
          </div>
        </div>
      </div>
    );
  }
}

TransactionHistoryHeader.propTypes = {
  currency: PropTypes.string,
  sorting: PropTypes.any,
  updateSorting: PropTypes.func,
};

export default TransactionHistoryHeader;
