import React from 'react';
import PropTypes from 'prop-types';
import swapCurrency from '../../../images/switch_currency.png';
import ITMReceive from '../../../images/ITMRECEIVE.png';
import ITMSEND from '../../../images/ITMSEND.png';

class TransactionListHeader extends React.Component {
  state = {
    renderHead: 'transactionDate',
  };

  updateSorting = (columnName, renderHead) => {
    const { sorting, updateSorting, closeDropDownHandler } = this.props;
    closeDropDownHandler();
    updateSorting({
      column: columnName,
      value: sorting.column === columnName ? sorting.value * -1 : -1,
    });

    this.setState({ renderHead });
  };

  renderHeaderStyle = columnName => {
    const { renderHead } = this.state;

    if (renderHead === columnName) {
      return {
        borderBottom: '2px solid white',
        display: 'flex',
        // justifyContent: 'space-between',
        paddingBottom: 10,
        position: 'relative',
        top: 7,
        wordBreak: 'break-word',
      };
    }
    return {
      display: 'flex',
      // justifyContent: 'space-between',
      paddingBottom: 10,
      position: 'relative',
      top: 7,
    };
  };

  render() {
    const { sorting } = this.props;
    const { renderHead } = this.state;

    const headerArrow =
      sorting.value === 1 ? (
        <span style={{ fontWeight: 'bolder', flex: '1' }}> &uarr; </span>
      ) : (
        <span style={{ fontWeight: 'bolder', flex: '1' }}> &darr; </span>
      );

    const { toggleHandler, classNameCrypto, classNameCurrency } = this.props;
    return (
      <thead>
        <tr style={{ fontSize: '14px' }}>
          <th
            className="transaction-date"
            onClick={() => {
              this.updateSorting('transactionDate', 'transactionDate');
            }}
            style={{ width: '18%' }}
          >
            <span style={this.renderHeaderStyle('transactionDate')}>
              <span style={{ flex: '11' }}>TRANSACTION DATE</span>
              {renderHead === 'transactionDate' && headerArrow}
            </span>
          </th>
          <th
            className="is-hidden-mobile"
            onClick={() => {
              this.updateSorting('requestDate', 'requestDate');
            }}
            style={{ width: '17%' }}
          >
            <span style={this.renderHeaderStyle('requestDate')}>
              <span style={{ flex: '11' }}>REQUEST DATE</span>
              {renderHead === 'requestDate' && headerArrow}
            </span>
          </th>
          <th
            className="is-hidden-mobile"
            onClick={() => {
              this.updateSorting('orderId', 'orderId');
            }}
            style={{ width: '12%' }}
          >
            <span style={this.renderHeaderStyle('orderId')}>
              <span style={{ flex: '11' }}>DETAILS</span>
              {renderHead === 'orderId' && headerArrow}
            </span>
          </th>

          <th
            className={classNameCrypto}
            onClick={() => {
              this.updateSorting('credit', 'credit');
            }}
            style={{ width: '12%' }}
          >
            <span style={this.renderHeaderStyle('credit')}>
              <span style={{ flex: '11' }}>
                <img src={ITMSEND} className="arrowImgIn" alt="in crypto" />
                <span style={{ marginLeft: '5px' }}>IN CRYPTO</span>
              </span>

              {renderHead === 'credit' && headerArrow}
            </span>
          </th>

          <th
            className={classNameCrypto}
            onClick={() => {
              this.updateSorting('charge', 'charge');
            }}
            style={{ width: '13%' }}
          >
            <span style={this.renderHeaderStyle('charge')}>
              <span style={{ flex: '11' }}>
                <img
                  src={ITMReceive}
                  className="arrowImgOut"
                  alt="out crypto"
                />
                <span style={{ marginLeft: '5px' }}>OUT CRYPTO</span>
              </span>
              {renderHead === 'charge' && headerArrow}
            </span>
          </th>

          <th
            className={classNameCurrency}
            onClick={() => {
              this.updateSorting('credit', 'in-usd');
            }}
            style={{ width: '12%' }}
          >
            <span style={this.renderHeaderStyle('in-usd')}>
              <span style={{ flex: '11' }}>
                <img src={ITMSEND} className="arrowImgIn" alt="in crypto" />
                <span style={{ marginLeft: '5px' }}>IN USD</span>
              </span>

              {renderHead === 'in-usd' && headerArrow}
            </span>
          </th>

          <th
            className={classNameCurrency}
            onClick={() => {
              this.updateSorting('charge', 'out-usd');
            }}
            style={{ width: '13%' }}
          >
            <span style={this.renderHeaderStyle('out-usd')}>
              <span style={{ flex: '11' }}>
                <img
                  src={ITMReceive}
                  className="arrowImgOut"
                  alt="out crypto"
                />
                <span style={{ marginLeft: '5px' }}>OUT USD</span>
              </span>
              {renderHead === 'out-usd' && headerArrow}
            </span>
          </th>

          <th style={{ width: '4%' }} className="tdTablet">
            <button
              className="is-hidden-desktop is-hidden-tablet has-text-centered"
              onClick={toggleHandler}
            >
              <img src={swapCurrency} alt="switch" width="25px" />
            </button>
          </th>
        </tr>
      </thead>
    );
  }
}

TransactionListHeader.propTypes = {
  sorting: PropTypes.object,
  updateSorting: PropTypes.func,
  toggleHandler: PropTypes.func,
  classNameCrypto: PropTypes.string,
  classNameCurrency: PropTypes.string,
  closeDropDownHandler: PropTypes.func,
};

export default TransactionListHeader;
