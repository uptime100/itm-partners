import React from 'react';
import PropTypes from 'prop-types';
import CompanyDetailsRow from './CompanyDetailsRow';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class CompaniesDetails extends React.Component {
  render() {
    let companiesRows = [];
    try {
      companiesRows = this.props.companies.map((company, index) => (
        <CompanyDetailsRow
          key={index}
          company={company}
          onClickOpenSuspendModal={this.props.onClickOpenSuspendModal}
        />
      ));
    } catch (e) {}
    return (
      <div>
        <div id="companyAlign" className="box">
          <div className="columns" style={{ borderBottom: '1px solid #ddd' }}>
            <div className="column resultMobile">
              <strong>Search Results</strong>
            </div>
            <div className="column is-2 has-text-left rowHeader">
              <strong>Name</strong>
            </div>
            <div className="column is-3 has-text-left rowHeader">
              <strong>Category</strong>
            </div>
            <div className="column is-2 has-text-left rowHeader">
              <strong>Plugin Types</strong>
            </div>
            <div className="column is-1 has-text-left rowHeader">
              <strong>Active Deals</strong>
            </div>
            <div className="column is-1 has-text-left rowHeader">
              <strong>Country</strong>
            </div>
            <div className="column is-1 has-text-left rowHeader">
              <strong>Last Login</strong>
            </div>

            <div className="column is-2 rowHeader">
              <strong>Action</strong>
            </div>
          </div>
          {companiesRows}
        </div>
      </div>
    );
  }
}

CompaniesDetails.propTypes = {
  companies: PropTypes.array,
  onClickOpenSuspendModal: PropTypes.func,
};

export default CompaniesDetails;
