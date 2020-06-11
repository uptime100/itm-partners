import React from 'react';
// import Select from 'react-select';
// mport H1 from '../../components/H1';
import H3 from '../../components/H3';
import PropTypes from 'prop-types';
// import PrimaryButton from '../../components/PrimaryButton';
// import { selectAccountDomain } from './selectors';

class AccountCurrencies extends React.Component {
  render() {
    const currencies = [
      { value: 'intimate', label: 'intimate' },
      { value: 'ether', label: 'Ethereum' },
      { value: 'bitcoin', label: 'bitcoin' },
      { value: 'bitcoin cash', label: 'bitcoin cash' },
      { value: 'litecoin', label: 'litecoin' },
    ];

    const currenciesLists = currencies.map((currency, index) => {
      let checked;
      try {
        checked = this.props.currencies.includes(currency.value);
      } catch (e) {}

      return (
        <label
          className="checkbox"
          style={{ marginRight: '1rem', fontFamily: 'Montserrat' }}
          onClick={this.props.onCurrenciesClicked}
          key={index}
        >
          <input
            type="checkbox"
            value={currency.value}
            style={{ marginRight: '0.5rem' }}
            checked={checked}
          />
          {currency.label}
        </label>
      );
    });

    return (
      <div>
        <div className="currenciesContainer">
          <H3>
            <div>
              <strong>Cryptocurrencies available</strong>
            </div>
          </H3>
          <div>{currenciesLists}</div>
        </div>
      </div>
    );
  }
}

AccountCurrencies.propTypes = {
  currencies: PropTypes.array,
  onCurrenciesClicked: PropTypes.func,
};

export default AccountCurrencies;
