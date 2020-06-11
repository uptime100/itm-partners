/**
 *
 * AddNewCompanyPanel
 *
 */

import React from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import Select from 'react-select';

import PropTypes from 'prop-types';
// import styled from 'styled-components';
import H1 from '../../components/H1';
// import PrimaryButton from '../../components/PrimaryButton';
import PrimaryButton from '../../components/PrimaryButton';

/* eslint-disable react/prefer-stateless-function */
class AddNewCompanyPanel extends React.Component {
  render() {
    let role = 'ADMIN';
    try {
      role = this.props.currentUser.role.slug;
    } catch (e) {}
    const validationErrors = this.props.validationErrors;
    let companyNameHelp = null;
    let roleIdHelp = null;
    let emailAddressHelp = null;
    let nameHelp = null;
    if (validationErrors) {
      if (validationErrors.companyName) {
        companyNameHelp = (
          <p className="help is-danger">
            {validationErrors.companyName.length > 0
              ? validationErrors.companyName[0]
              : ''}
          </p>
        );
      }
      if (validationErrors.roleId) {
        roleIdHelp = (
          <p className="help is-danger">
            {validationErrors.roleId.length > 0
              ? validationErrors.roleId[0]
              : ''}
          </p>
        );
      }
      if (validationErrors.email) {
        emailAddressHelp = (
          <p className="help is-danger">
            {validationErrors.email.length > 0 ? validationErrors.email[0] : ''}
          </p>
        );
      }
      if (validationErrors.name) {
        nameHelp = (
          <p className="help is-danger">
            {validationErrors.name.length > 0 ? validationErrors.name[0] : ''}
          </p>
        );
      }
    }

    let companyOptions = [];
    try {
      companyOptions = this.props.companies.map(company => ({
        value: company.companyName,
        label: company.companyName,
      }));
      if (this.props.newCompanyOption && this.props.createMode) {
        companyOptions.push(this.props.newCompanyOption);
      }
    } catch (e) {}

    let partnerOptions = [];
    try {
      partnerOptions = this.props.roles
        .map(partnerRole => ({
          value: partnerRole._id,
          label: partnerRole.name,
        }))
        .filter(option => {
          if (this.props.createMode) {
            return ['Partner'].includes(option.label);
          }
          if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
            return !['Admin', 'Super Admin', 'Partner'].includes(option.label);
          } else if (this.props.companyName === 'intimate') {
            return ['Admin', 'Super Admin'].includes(option.label);
          }

          return !['Admin', 'Super Admin'].includes(option.label);
        })
        .map(option => {
          const newOption = option;
          if (role !== 'ADMIN') {
            newOption.label = option.label.replace('Partner ', '');
          }
          return newOption;
        });
    } catch (e) {}

    let companyNameField = null;
    if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
      const val = this.props.newCompanyOption
        ? this.props.newCompanyOption.value
        : '';
      companyNameField = (
        <div className="field">
          <label htmlFor="companyName">
            <strong>Company Screen Name</strong>
          </label>
          <div className="control test">
            <CreatableSelect
              options={companyOptions}
              inputValue={this.props.companyNameInput}
              value={
                companyOptions.filter(companyOption => {
                  if (this.props.createMode) {
                    return companyOption.value === val;
                  }
                  return companyOption.value === this.props.companyName;
                })[0]
              }
              name="companyName"
              placeholder="Enter Screen Name (or select existing company)"
              onChange={this.props.onChangeCompanyName}
              onInputChange={this.props.onChangeCompanyNameInput}
              onCreateOption={this.props.onCreateCompany}
            />
          </div>
          {companyNameHelp}
        </div>
      );
    }

    let buttonLabel = 'Add User';
    if (role !== 'ADMIN' && this.props.createMode) {
      buttonLabel = 'Add and Configure';
    }
    return (
      <div className="box">
        <H1 className="test">Add New User</H1>

        <form method="POST" onSubmit={this.props.onAddNewCompany}>
          {companyNameField}

          <div className="field">
            <label htmlFor="roleId">
              <strong>Select Role</strong>
            </label>
            <div className="control">
              <Select
                options={partnerOptions}
                value={
                  partnerOptions.filter(
                    partnerOption => partnerOption.value === this.props.roleId,
                  )[0]
                }
                name="roleId"
                placeholder="Select Role"
                onChange={this.props.onChangeRoleId}
              />
            </div>
            {roleIdHelp}
          </div>

          <div className="field">
            <label htmlFor="email">
              <strong>Email Address</strong>
            </label>
            <div className="control">
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email Address"
                value={this.props.email}
                onChange={this.props.onChangeEmail}
              />
            </div>
            {emailAddressHelp}
          </div>

          <div className="field">
            <label htmlFor="name">
              <strong>Primary Contact Name</strong>
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Primary Contact Name"
                value={this.props.name}
                onChange={this.props.onChangeContactName}
              />
            </div>
            {nameHelp}
          </div>

          <div className="field">
            <div className="control has-text-right has-text-centered-mobile">
              <PrimaryButton type="submit">{buttonLabel}</PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

AddNewCompanyPanel.propTypes = {
  email: PropTypes.string,
  roleId: PropTypes.string,
  companyName: PropTypes.string,
  companyNameInput: PropTypes.string,
  companies: PropTypes.array,
  name: PropTypes.string,
  roles: PropTypes.array,
  onChangeContactName: PropTypes.func,
  onChangeCompanyNameInput: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangeRoleId: PropTypes.func,
  onChangeCompanyName: PropTypes.func,
  onAddNewCompany: PropTypes.func,
  validationErrors: PropTypes.object,
  currentUser: PropTypes.object,
  onCreateCompany: PropTypes.func,
  createMode: PropTypes.bool,
  newCompanyOption: PropTypes.object,
};

export default AddNewCompanyPanel;
