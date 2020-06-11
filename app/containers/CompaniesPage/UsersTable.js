import React from 'react';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class UsersTable extends React.Component {
  render() {
    let users;
    try {
      users = this.props.users.map(user => (
        <div className="columns" key={user._id}>
          <div className="column is-2 has-text-left rowHeader">{user.name}</div>
          <div className="column is-2 has-text-left rowHeader">
            {user.email}
          </div>
          <div className="column is-2 has-text-left rowHeader">
            {user.roleId}
          </div>
          <div className="column is-2 has-text-left rowHeader" />
          <div className="column is-2 has-text-left rowHeader">
            <strong>2018-11-11</strong>
          </div>

          <div className="column is-2 rowHeader" />
        </div>
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
            <div className="column is-2 has-text-left rowHeader">
              <strong>Email</strong>
            </div>
            <div className="column is-2 has-text-left rowHeader">
              <strong>Role</strong>
            </div>
            <div className="column is-2 has-text-left rowHeader">
              <strong>Status</strong>
            </div>
            <div className="column is-2 has-text-left rowHeader">
              <strong>Last Login</strong>
            </div>

            <div className="column is-2 rowHeader">
              <strong>Action</strong>
            </div>
          </div>
          {users}
        </div>
      </div>
    );
  }
}

UsersTable.propTypes = {
  users: PropTypes.array,
};

export default UsersTable;
