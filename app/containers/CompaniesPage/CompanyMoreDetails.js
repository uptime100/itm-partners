import React, { PureComponent } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import H3 from '../../components/H3';

class CompanyMoreDetails extends PureComponent {
  render() {
    const actions = [
      { value: 'Suspend', label: 'Suspend' },
      { value: 'Manage', label: 'Manage' },
      { value: 'Password', label: 'Password' },
      { value: 'Save', label: 'Save' },
    ];

    const companyRole = [
      { value: 'Manager', label: 'Manager' },
      { value: 'Finance', label: 'Finance' },
      { value: 'Partner', label: 'Partner' },
      { value: 'Marketer', label: 'Marketer' },
    ];

    return (
      <div className="columns boxSize box">
        <div className="companyEmail column is-3 has-text-left">
          <span className="detailsMobile">
            <strong>Username : </strong>
          </span>{' '}
          {this.props.user.email}
        </div>
        <div className="selectSize column is-4 has-text-left">
          <span className="detailsMobile">
            <strong>Role : </strong>
          </span>
          <div className="selectWidth">
            <Select
              options={companyRole}
              name=""
              value=""
              placeholder={companyRole[0].value}
            />
          </div>
        </div>
        <div className="column is-3 has-text-left">
          <span className="detailsMobile">
            <strong>Last Login : </strong>
          </span>
          <H3>YY:MM:DD</H3>
        </div>
        <div className="column is-2 has-text-left">
          <div className="selectSize">
            <span className="detailsMobile">
              <strong>Actions : </strong>
            </span>
            <Select
              options={actions}
              name=""
              value=""
              placeholder={actions[0].value}
            />
          </div>
        </div>
      </div>
    );
  }
}

CompanyMoreDetails.propTypes = {
  user: PropTypes.object,
};
export default CompanyMoreDetails;
