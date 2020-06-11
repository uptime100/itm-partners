import React from 'react';
import H1 from '../../../components/H1';
import AdminPermissionsContent from './AdminPermissionsContent';

class AdminPermissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isToggleOn: !this.state.isToggleOn,
    });
  }
  render() {
    const showDetails = this.state.isToggleOn ? (
      <span>
        <i className="fas fa-angle-up" />
      </span>
    ) : (
      <span>
        <i className="fas fa-angle-down" />
      </span>
    );

    const permissionDetails = this.state.isToggleOn ? (
      <AdminPermissionsContent />
    ) : (
      ''
    );
    return (
      <div>
        <div className="columns">
          <div className="column">
            <H1>Permissions - Admin</H1>
          </div>
          <div className="column has-text-right">
            <button
              style={{ position: 'relative', top: '20px' }}
              onClick={this.handleClick}
            >
              {showDetails}
            </button>
          </div>
        </div>

        {permissionDetails}
      </div>
    );
  }
}

export default AdminPermissions;
