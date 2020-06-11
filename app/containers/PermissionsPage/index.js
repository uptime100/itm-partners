/**
 *
 * PermissionsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPermissionsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { LOAD_ROLES_AND_PERMISSIONS, UPDATE_PERMISSION } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class PermissionsPage extends React.PureComponent {
  componentDidMount() {
    this.props.loadInitial();
  }

  renderRoles() {
    const rolesRow = this.props.permissionsPage.roles.map(role => (
      <th key={role._id}>{role.name}</th>
    ));

    return (
      <thead>
        <tr>
          <th />
          {rolesRow}
        </tr>
      </thead>
    );
  }

  renderScopes() {
    const scopeRows = this.props.permissionsPage.scopes.map(scope => (
      <tr key={scope._id}>
        <td>{scope.slug}</td>

        {this.renderPermissions(scope)}
      </tr>
    ));

    return <tbody>{scopeRows}</tbody>;
  }

  renderPermissions(scope) {
    return this.props.permissionsPage.roles.map(role => {
      const checked = role.scopes.includes(scope._id);
      return (
        <td key={role._id}>
          <input
            type="checkbox"
            checked={checked}
            onChange={e => {
              e.preventDefault();
              this.props.updatePermission(checked, role._id, scope._id);
            }}
          />
        </td>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <table className="table">
          {this.renderRoles()}
          {this.renderScopes()}
        </table>
      </div>
    );
  }
}

PermissionsPage.propTypes = {
  loadInitial: PropTypes.func.isRequired,
  updatePermission: PropTypes.func,
  permissionsPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  permissionsPage: makeSelectPermissionsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadInitial: () => {
      dispatch({ type: LOAD_ROLES_AND_PERMISSIONS });
    },
    updatePermission: (checked, roleId, scopeId) => {
      dispatch({
        type: UPDATE_PERMISSION,
        payload: { checked, roleId, scopeId },
      });
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'permissionsPage', reducer });
const withSaga = injectSaga({ key: 'permissionsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PermissionsPage);
