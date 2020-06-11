import React from 'react';
import PropTypes from 'prop-types';
// mport H1 from '../../components/H1';
import H3 from '../../components/H3';
import Select from 'react-select';
import AccountCurrencies from './AccountCurrencies';
// import PrimaryButton from '../../components/PrimaryButton';

const ct = require('countries-and-timezones');
const cc = require('currency-codes/data');

class AccountPreferences extends React.Component {
  render() {
    const currencyLists = cc.map(currency => ({
      value: currency.code,
      label: currency.code,
    }));

    const selectedLocalCurrency = currencyLists.filter(
      currency => currency.value === this.props.localCurrency,
    )[0];

    const categories = [
      { label: 'Retail', value: 'retail' },
      { label: 'Cams', value: 'cams' },
      { label: 'Content', value: 'content' },
      { label: 'Lingerie', value: 'lingerie' },
      { label: 'Escorting', value: 'escorting' },
      { label: 'Oracle', value: 'oracle' },
      { label: 'BDSM', value: 'bdsm' },
      { label: 'Kink', value: 'kink' },
      { label: 'Dating', value: 'dating' },
      { label: 'Swinging', value: 'swinging' },
      { label: 'Specialist', value: 'specialist' },
      { label: 'B2B', value: 'b2b' },
    ];

    const countries = ct.getAllCountries();
    const timezones = ct.getAllTimezones();

    const mapTimezones = [];
    const mapCountries = [];

    for (const key in countries) {
      if (key) {
        mapCountries.push(countries[key]);
      }
    }

    const primaryCountries = mapCountries.map(country => ({
      value: country.id,
      label: country.id,
    }));

    const selectedPrimaryCountries = primaryCountries.filter(
      country => country.value === this.props.primaryCountry,
    )[0];

    for (const key in timezones) {
      if (key) {
        mapTimezones.push(timezones[key]);
      }
    }

    const localTimezones = mapTimezones.map(timezone => ({
      value: timezone.name,
      label: `GMT ${timezone.offsetStr}`,
    }));

    const gmts = [];

    const selectedGmt = localTimezones
      .filter(timezone => {
        if (!gmts.includes(timezone.label)) {
          gmts.push(timezone.label);
          return timezone;
        }
        return '';
      })
      .sort((a, b) => {
        if (a.label < b.label) {
          return -1;
        }
        if (a.label > b.label) {
          return 1;
        }
        return 0;
      });

    const selectedLocalTimezone = localTimezones.filter(
      timezone => timezone.value === this.props.localTimezone,
    )[0];

    const targetAudience = [
      { label: 'Gay', value: 'gay' },
      { label: 'Trans', value: 'trans' },
      { label: 'LGBTIQ', value: 'lgbtiq' },
      { label: 'Straight', value: 'straight' },
      { label: 'All', value: 'all' },
    ];

    const targetAudienceLists = targetAudience.map((audience, index) => {
      let checked;
      try {
        checked = this.props.targetAudiences.includes(audience.value);
      } catch (e) {}
      return (
        <label
          className="checkbox checkboxMobile"
          style={{ marginRight: '1rem', fontFamily: 'Montserrat' }}
          key={index}
        >
          <input
            type="checkbox"
            value={audience.value}
            style={{ marginRight: '0.5rem' }}
            checked={checked}
            onClick={this.props.onTargetAudienceClicked}
          />
          {audience.label}
        </label>
      );
    });

    const categoriesLists = categories.map((category, index) => {
      let checked;
      try {
        checked = this.props.categories.includes(category.value);
      } catch (e) {}
      return (
        <div className="column is-3" key={index}>
          <label
            className="checkbox checkboxMobile"
            style={{ marginRight: '1rem', fontFamily: 'Montserrat' }}
            onClick={this.props.onCategoryClicked}
          >
            <input
              type="checkbox"
              value={category.value}
              style={{ marginRight: '0.5rem' }}
              checked={checked}
            />
            {category.label}
          </label>
        </div>
      );
    });

    return (
      <div>
        <H3>
          <strong>Categories</strong>
        </H3>
        <div className="columns is-multiline is-gapless">{categoriesLists}</div>
        <H3>
          <div style={{ marginTop: '25px' }}>
            <div>
              <strong>Target Audience</strong>
            </div>
          </div>
        </H3>
        <div className="columns is-gapless">{targetAudienceLists}</div>
        <div className="columns is-gapless">
          <div className="column localMobile">
            <label htmlFor="country">
              <strong>Primary Country</strong>
            </label>
            <Select
              options={primaryCountries}
              name="country"
              value={selectedPrimaryCountries}
              placeholder="Select Country"
              onChange={this.props.onChangePrimaryCountry}
            />
          </div>
          <div className="column localMobile">
            <label htmlFor="currency">
              <strong>Local Currency</strong>
            </label>
            <Select
              options={currencyLists}
              name="currency"
              placeholder="Local Currency"
              value={selectedLocalCurrency}
              onChange={this.props.onChangeLocalCurrency}
            />
          </div>
          <div className="column localMobile">
            <label htmlFor="timezone">
              <strong>Local Timezone</strong>
            </label>
            <Select
              options={selectedGmt}
              name="timezone"
              placeholder="Local Timezone"
              value={selectedLocalTimezone}
              onChange={this.props.onChangeLocalTimezone}
            />
          </div>
        </div>
        <AccountCurrencies
          currencies={this.props.currencies}
          onCurrenciesClicked={this.props.onCurrenciesClicked}
        />
      </div>
    );
  }
}

AccountPreferences.propTypes = {
  categories: PropTypes.array,
  onCategoryClicked: PropTypes.func,
  targetAudiences: PropTypes.array,
  onTargetAudienceClicked: PropTypes.func,
  localTimezone: PropTypes.string,
  onChangeLocalTimezone: PropTypes.func,
  localCurrency: PropTypes.string,
  onChangeLocalCurrency: PropTypes.func,
  primaryCountry: PropTypes.string,
  onChangePrimaryCountry: PropTypes.func,
  onCurrenciesClicked: PropTypes.func,
  currencies: PropTypes.array,
};
export default AccountPreferences;
