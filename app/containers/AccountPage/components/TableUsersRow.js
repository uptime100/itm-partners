import React from 'react';
import PropTypes from 'prop-types';

class TableUsersRow extends React.Component {
  state = {
    isToggle: false,
  };

  handleToggle = () => {
    this.setState({ isToggle: !this.state.isToggle });
  };

  render() {
    const { isToggle } = this.state;
    const { setUserToSuspend, toggleSuspendModal, currentUser } = this.props;

    const toggleClassname = isToggle ? 'dropdown is-active' : 'dropdown';
    const { user } = this.props;

    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.role.slug}</td>
        <td>{user.email}</td>
        <td>
          {user.isActive ? (
            <span className="tag is-primary">Active</span>
          ) : (
            <span className="tag is-danger">Suspended</span>
          )}
        </td>
        <td className="has-text-centered-mobile">
          <div className={`${toggleClassname} is-hoverable`}>
            <div className="dropdown-trigger">
              <button
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                disabled={currentUser.role.level >= user.role.level}
              >
                <span>Action</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true" />
                </span>
              </button>
            </div>

            {currentUser.role.level < user.role.level && (
              <div
                className="dropdown-menu"
                id="dropdown-menu"
                role="menu"
                style={{ zIndex: 99 }}
              >
                <div className="dropdown-content dropdown-width">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      toggleSuspendModal(true);
                      setUserToSuspend(user);
                    }}
                  >
                    {user.isActive ? 'Suspend' : 'Activate'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </td>
      </tr>
    );
  }
}

TableUsersRow.propTypes = {
  user: PropTypes.any,
  toggleSuspendModal: PropTypes.func,
  setUserToSuspend: PropTypes.func,
  currentUser: PropTypes.any,
};

export default TableUsersRow;
