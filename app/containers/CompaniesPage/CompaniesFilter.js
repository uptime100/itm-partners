import React from 'react';
import Select from 'react-select';
import H1 from '../../components/H1';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import PrimaryButton from '../../components/PrimaryButton';

/* eslint-disable react/prefer-stateless-function */
class CompaniesFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchUsers: '',
      categoryName: '',
      pluginID: '',
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleInputFilterChange = this.handleInputFilterChange.bind(this);
  }

  handleInputFilterChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSearch(event) {
    event.preventDefault();
  }

  render() {
    const categoryOptions = [
      { value: 'Retail', label: 'Retail' },
      { value: 'Category2', label: 'Category2' },
      { value: 'Category3', label: 'Category3' },
    ];

    const pluginOptions = [
      { value: 'WooCommerce', label: 'Woocommerce' },
      { value: 'Paypal', label: 'Paypal' },
    ];

    return (
      <div className="box filterMobile">
        <H1>Filter</H1>
        <form method="POST">
          <div className="columns">
            <div className="column">
              <div className="field">
                <label htmlFor="categoryName">
                  <strong>Category</strong>
                </label>
                <div className="control">
                  <Select
                    options={categoryOptions}
                    name="categoryName"
                    value={this.state.categoryName}
                    placeholder=" Select Category"
                    onChange={this.handleInputFilterChange}
                  />
                </div>
              </div>
            </div>

            <div className="column">
              <div className="field">
                <label htmlFor="pluginID">
                  <strong>Plugin</strong>
                </label>
                <div className="control is-medium">
                  <Select
                    options={pluginOptions}
                    name="pluginID"
                    value={this.state.pluginID}
                    placeholder="Select Plugin"
                    onChange={this.handleInputFilterChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <label htmlFor="searchUsers">
                <strong>Search Users</strong>
              </label>
              <div className="field has-addons">
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    name="searchUsers"
                    value={this.state.searchUsers}
                    placeholder="Search Users"
                    onChange={this.handleInputFilterChange}
                  />
                </p>
                <p className="control">
                  <PrimaryButton onClick={event => this.handleSearch(event)}>
                    <i className="fas fa-search" />
                  </PrimaryButton>
                </p>
              </div>
            </div>
          </div>
        </form>

        <div className="columns">
          <div className="column is-5 is-8-mobile is-inline-block-mobile">
            <div className="exportData">EXPORT CURRENT DATA</div>
          </div>
          <div className="column is-7 is-4-mobile is-inline-block-mobile has-text-right-mobile">
            <PrimaryButton>Export</PrimaryButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CompaniesFilter;
