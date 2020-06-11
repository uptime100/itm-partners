import React from 'react';
import Select from 'react-select';
import H1 from '../../components/H1';
import H3 from '../../components/H3';
import PropTypes from 'prop-types';
import AccountPreferences from './AccountPreference';
import DefaultButton from '../../components/DefaultButton';

class AccountConfigurations extends React.Component {
  render() {
    const displayOptions = [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ];

    const PluginsAvailable = [
      { value: 'woocommerce', label: 'Woocommerce' },
      { value: 'shopify', label: 'Shopify' },
      { value: 'magento', label: 'Magento' },
    ];

    const PluginLists = PluginsAvailable.map((plugins, index) => {
      let checked;
      try {
        checked = this.props.plugins.includes(plugins.value);
      } catch (e) {}
      return (
        <label
          className="checkbox checkboxMobile"
          style={{ marginRight: '1rem', fontFamily: 'Montserrat' }}
          key={index}
        >
          <input
            type="checkbox"
            value={plugins.value}
            style={{ marginRight: '0.5rem' }}
            checked={checked}
            onClick={this.props.onPluginClicked}
          />
          {plugins.label}
        </label>
      );
    });
    return (
      <div className="box">
        <form>
          <div className="columns">
            <div className="column is-6 is-6-tablet is-8-mobile mobileRes">
              <H1>Configurations</H1>
            </div>
          </div>

          <div className="columns">
            <div className="column resetMobile">
              <label htmlFor="accountEmail">
                <strong>Account Email Address</strong>
              </label>
              <div className="field has-addons">
                <div
                  className="control resetPassInput"
                  style={{ flex: '1 0 70%' }}
                >
                  <input
                    className="input"
                    type="email"
                    name="accountEmail"
                    placeholder="Account Email Address"
                    readOnly="readOnly"
                    value={this.props.accountEmail}
                    disabled
                  />
                </div>
                <div
                  className="control resetPassButton"
                  style={{ flex: '1 0 30%' }}
                >
                  <DefaultButton
                    className="resetButton"
                    type="button"
                    onClick={this.props.onClickOpenModal}
                  >
                    RESET PASSWORD
                  </DefaultButton>
                </div>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column is-6 is-6-mobile mobileRes">
              <H3>Display on website</H3>
            </div>

            <div className="column is-6 is-6-mobile mobileRes">
              <div className="field">
                <div className="control">
                  <Select
                    options={displayOptions}
                    name="displayWebsite"
                    placeholder="Yes"
                  />
                </div>
              </div>
            </div>
          </div>

          <H3>
            <div>
              <strong>Plugins Available</strong>
            </div>
          </H3>

          <div className="columns is-gapless">{PluginLists}</div>

          <AccountPreferences
            categories={this.props.categories}
            onCategoryClicked={this.props.onCategoryClicked}
            targetAudiences={this.props.targetAudiences}
            onTargetAudienceClicked={this.props.onTargetAudienceClicked}
            currencies={this.props.currencies}
            onCurrenciesClicked={this.props.onCurrenciesClicked}
            localTimezone={this.props.localTimezone}
            onChangeLocalTimezone={this.props.onChangeLocalTimezone}
            localCurrency={this.props.localCurrency}
            onChangeLocalCurrency={this.props.onChangeLocalCurrency}
            primaryCountry={this.props.primaryCountry}
            onChangePrimaryCountry={this.props.onChangePrimaryCountry}
          />
        </form>
      </div>
    );
  }
}

AccountConfigurations.propTypes = {
  onClickOpenModal: PropTypes.func,
  categories: PropTypes.array,
  onCategoryClicked: PropTypes.func,
  plugins: PropTypes.array,
  onPluginClicked: PropTypes.func,
  targetAudiences: PropTypes.array,
  onTargetAudienceClicked: PropTypes.func,
  accountEmail: PropTypes.string,
  localTimezone: PropTypes.string,
  localCurrency: PropTypes.string,
  primaryCountry: PropTypes.string,
  currencies: PropTypes.array,
  onChangeLocalTimezone: PropTypes.func,
  onChangeLocalCurrency: PropTypes.func,
  onChangePrimaryCountry: PropTypes.func,
  onCurrenciesClicked: PropTypes.func,
};

export default AccountConfigurations;
