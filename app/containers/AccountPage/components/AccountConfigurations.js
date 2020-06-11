import React from 'react';
import Select from 'react-select';
import H1 from '../../../components/H1';
import H3 from '../../../components/H3';
import PropTypes from 'prop-types';

import LabelSelectHorizontal from '../components/LabelSelectHorizontal';
import CheckBox from '../components/CheckBox';
import colourStyles from '../../../components/KitchenSink/colourStyle2';

const ct = require('countries-and-timezones');
const cc = require('currency-codes/data');

class AccountConfigurations extends React.Component {
  render() {
    // is ADMIN
    const isAdmin = this.props.role.level < 2;

    // LOAD ALL PLUGINS
    const pluginsAvailable = [
      { value: 'woocommerce', label: 'WooCommerce' },
      { value: 'shopify', label: 'Shopify' },
      { value: 'magento', label: 'Magento' },
    ];

    const pluginList = pluginsAvailable.map((plugin, index) => {
      let checked;
      try {
        checked = this.props.form.plugins.includes(plugin.value);
      } catch (e) {}

      return (
        <div
          className="column is-12-mobile"
          style={{ marginTop: '4px' }}
          key={index}
        >
          <CheckBox
            value={plugin.value}
            onChange={e => {
              let plugins = this.props.form.plugins.slice();
              if (e.target.checked) {
                plugins.push(e.target.value);
              } else {
                plugins = plugins.filter(item => item !== e.target.value);
              }
              this.props.updatePlugins(plugins);
            }}
            label={plugin.label}
            checked={checked}
          />
        </div>
      );
    });

    // LOAD CURRENCY
    const currencyLists = cc.map(currency => ({
      value: currency.code,
      label: currency.code,
    }));

    const selectedLocalCurrency = currencyLists.filter(
      currency => currency.value === this.props.form.localCurrency,
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

    for (const key in timezones) {
      if (key) {
        mapTimezones.push(timezones[key]);
      }
    }

    const primaryCountries = mapCountries.map(country => ({
      value: country.id,
      label: country.id,
    }));

    const selectedPrimaryCountries = primaryCountries.filter(
      country => country.value === this.props.form.primaryCountry,
    )[0];

    const targetAudience = [
      { label: 'Gay', value: 'gay' },
      { label: 'Trans', value: 'trans' },
      { label: 'LGBTIQ', value: 'lgbtiq' },
      { label: 'Straight', value: 'straight' },
    ];

    const targetAudienceLists = targetAudience.map((audience, index) => {
      let checked;
      try {
        checked = this.props.form.targetAudience.includes(audience.value);
      } catch (e) {}
      return (
        <div className="is-12-mobile" style={{ marginTop: '4px' }} key={index}>
          <CheckBox
            value={audience.value}
            onChange={e => {
              let list = this.props.form.targetAudience.slice();
              if (e.target.checked) {
                list.push(e.target.value);
              } else {
                list = list.filter(listItem => listItem !== e.target.value);
              }
              this.props.updateTargetAudience(list);
            }}
            label={audience.label}
            checked={checked}
          />
        </div>
      );
    });

    const categoriesLists = categories.map((category, index) => {
      let checked;
      try {
        checked = this.props.form.categories.includes(category.value);
      } catch (e) {}
      return (
        <div className="column is-3" style={{ marginTop: '4px' }} key={index}>
          <CheckBox
            value={category.value}
            onChange={e => {
              let list = this.props.form.categories.slice();
              if (e.target.checked) {
                list.push(e.target.value);
              } else {
                list = list.filter(listItem => listItem !== e.target.value);
              }
              this.props.updateCategories(list);
            }}
            label={category.label}
            checked={checked}
          />
        </div>
      );
    });

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
      timezone => timezone.value === this.props.form.localTimezone,
    )[0];

    for (const key in timezones) {
      if (key) {
        mapTimezones.push(timezones[key]);
      }
    }

    const currencies = [
      { value: 'intimate', label: 'intimate' },
      { value: 'ethereum', label: 'Ethereum' },
      { value: 'bitcoin', label: 'Bitcoin' },
      { value: 'binance-coin', label: 'Binance' },
      { value: 'omisego', label: 'OmiseGo' },
      { value: 'funfair', label: 'FunFair' },
      { value: 'wax', label: 'Wax' },
      { value: 'spankchain', label: 'SpankChain' },
      // { value: 'bitcoin cash', label: 'Bitcoin Cash' },
      // { value: 'litecoin', label: 'Litecoin' },
    ];

    const currenciesLists = currencies.map((currency, index) => {
      let checked;
      try {
        checked = this.props.form.currencies.includes(currency.value);
      } catch (e) {}

      return (
        <div className="column is-3" style={{ marginTop: '4px' }} key={index}>
          <CheckBox
            value={currency.value}
            onChange={e => {
              let list = this.props.form.currencies.slice();
              if (e.target.checked) {
                list.push(e.target.value);
              } else {
                list = list.filter(listItem => listItem !== e.target.value);
              }
              this.props.updateCurrencies(list);
            }}
            label={currency.label}
            checked={checked}
            disabled={!isAdmin}
          />
        </div>
      );
    });

    const { currentUserEmail, role } = this.props;
    const accoutEmailPartner = this.props.form.users
      ? this.props.form.users[0].email
      : currentUserEmail;

    const accountEmailValue =
      role.slug === 'SUPER_ADMIN' || role.slug === 'ADMIN'
        ? accoutEmailPartner
        : currentUserEmail;

    return (
      <div className="column">
        <div className="box">
          <div>
            <H1>Configurations</H1>

            <div className="field">
              <label htmlFor="accountEmail" className="label">
                <strong>Account Email Address</strong>
              </label>
              <div className="field has-addons">
                <div className="control resetPassInput" style={{ flex: '70%' }}>
                  <input
                    className="input"
                    type="email"
                    name="accountEmail"
                    placeholder="Account Email Address"
                    readOnly="readOnly"
                    value={accountEmailValue}
                    disabled
                  />
                </div>
                <div
                  className="control resetPassButton"
                  style={{ flex: '1 0 30%' }}
                >
                  <button
                    className="button is-primary"
                    type="button"
                    onClick={this.props.resetPassword}
                  >
                    RESET PASSWORD
                  </button>
                </div>
              </div>
            </div>

            <LabelSelectHorizontal
              label="Display on website"
              options={[
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
              ]}
              placeholder="Yes"
            />

            <H3>
              <strong>Plugins Available</strong>
            </H3>

            <div className="columns is-gapless">{pluginList}</div>

            <H3>
              <strong>Categories</strong>
            </H3>

            <div className="columns is-multiline is-gapless">
              {categoriesLists}
            </div>

            <H3>
              <strong>Target Audience</strong>
            </H3>

            <div className="columns is-gapless">
              {targetAudienceLists}
              <div style={{ marginTop: '4px' }}>
                <CheckBox
                  value="all"
                  label="ALL"
                  checked={this.props.form.targetAudience.length === 4}
                  onChange={() => {
                    this.props.checkAllbox(
                      this.props.form.targetAudience.length === 4,
                    );
                  }}
                />
              </div>
            </div>

            <div className="columns">
              <div className="column is-4">
                <label className="label">Primary Country</label>
                <div style={{ position: 'relative', zIndex: 60 }}>
                  <Select
                    placeholder="Select Country"
                    styles={colourStyles}
                    className="dropDownSelect"
                    options={primaryCountries}
                    value={selectedPrimaryCountries}
                    onChange={tz => {
                      this.props.updateLocalPrimaryCountry(tz.value);
                    }}
                  />
                </div>
              </div>
              <div className="column is-4">
                <label className="label">Local Currency</label>
                <div style={{ position: 'relative', zIndex: 50 }}>
                  <Select
                    placeholder="Select Currency"
                    styles={colourStyles}
                    className="dropDownSelect"
                    options={currencyLists}
                    value={selectedLocalCurrency}
                    onChange={tz => {
                      this.props.updateLocalCurrency(tz.value);
                    }}
                  />
                </div>
              </div>
              <div className="column is-4">
                <label className="label">Local Timezone</label>
                <div style={{ position: 'relative', zIndex: 40 }}>
                  <Select
                    placeholder="Select Timezone"
                    styles={colourStyles}
                    className="dropDownSelect"
                    options={selectedGmt}
                    value={selectedLocalTimezone}
                    onChange={tz => {
                      this.props.updateLocalTimeZone(tz.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="currenciesContainer">
              <H3>
                <strong>Cryptocurrencies Available</strong>
              </H3>
              <div className="columns is-multiline is-gapless">
                {currenciesLists}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AccountConfigurations.propTypes = {
  form: PropTypes.object,
  updatePlugins: PropTypes.func,
  updateTargetAudience: PropTypes.func,
  updateCategories: PropTypes.func,
  updateCurrencies: PropTypes.func,
  resetPassword: PropTypes.func,
  updateLocalCurrency: PropTypes.func,
  updateLocalTimeZone: PropTypes.func,
  updateLocalPrimaryCountry: PropTypes.func,
  checkAllbox: PropTypes.func,
  role: PropTypes.object,
  currentUserEmail: PropTypes.string,
};

export default AccountConfigurations;
