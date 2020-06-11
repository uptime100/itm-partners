import React from 'react';
import PropTypes from 'prop-types';

import TransactionListBody from './TransactionListBody';
import TransactionListHeader from './TransactionListHeader';

class TransactionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
    };
  }

  toggleHandler = () => {
    if (window.screen.width <= 768) {
      this.setState({
        toggle: !this.state.toggle,
      });
    }
  };

  render() {
    const {
      transactions,
      sorting,
      updateSorting,
      dropDownToggle,
      dropDownToggleHandler,
      id,
      closeDropDownHandler,
    } = this.props;

    const { toggle } = this.state;
    const classNameCurrency = toggle
      ? 'is-hidden-mobile'
      : 'tdMobile has-text-centered-mobile';
    const classNameCrypto = toggle
      ? 'tdMobile has-text-centered-mobile'
      : 'is-hidden-mobile tdMobile';

    return (
      <table className="table is-fullwidth table-container double-rows">
        <TransactionListHeader
          sorting={sorting}
          updateSorting={updateSorting}
          toggleHandler={this.toggleHandler}
          classNameCurrency={classNameCurrency}
          classNameCrypto={classNameCrypto}
          closeDropDownHandler={closeDropDownHandler}
        />
        <TransactionListBody
          transactions={transactions}
          classNameCurrency={classNameCurrency}
          classNameCrypto={classNameCrypto}
          dropDownToggle={dropDownToggle}
          dropDownToggleHandler={dropDownToggleHandler}
          id={id}
        />
      </table>
    );
  }
}

TransactionsList.propTypes = {
  transactions: PropTypes.array,
  sorting: PropTypes.object,
  updateSorting: PropTypes.func,
  dropDownToggle: PropTypes.bool,
  dropDownToggleHandler: PropTypes.func,
  id: PropTypes.string,
  closeDropDownHandler: PropTypes.func,
};

export default TransactionsList;
