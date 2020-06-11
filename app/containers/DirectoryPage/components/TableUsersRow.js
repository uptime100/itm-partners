import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class TableUsersRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRole: props.user.role,
      currentRole: { label: props.user.role.name, value: props.user.role._id },
      editMode: false,
      user: props.user,
    };
  }

  toggleEditMode(editMode) {
    this.setState({ editMode });
  }

  handleChange = e => {
    console.log(e);
    this.setState({ currentRole: e });
  };

  cancelEditMode = () => {
    this.setState({
      currentRole: {
        label: this.state.initialRole.name,
        value: this.state.initialRole._id,
      },
    });
    this.toggleEditMode(false);
  };

  componentWillReceiveProps(props) {
    this.setState({ user: props.user });
  }

  save = () => {
    const { roles, updateUserRole } = this.props;
    const { currentRole } = this.state;

    // action saga
    updateUserRole(this.state.user._id, currentRole.value);

    // success
    let newRole = roles.find(role => role._id === currentRole.value);
    this.setState(prevState => {
      let user = { ...prevState.user };
      user.role = newRole;

      return { user };
    });

    this.toggleEditMode(false);
  };

  renderActionButton = () => {
    const {
      user,
      me,
      setEmailToResetPassword,
      openSuspendUserModal,
    } = this.props;
    let { editMode } = this.state;

    if (editMode) {
      return (
        <React.Fragment>
          <button className="button" onClick={this.cancelEditMode}>
            Cancel
          </button>{' '}
          &nbsp;
          <button className="button" onClick={this.save}>
            Save
          </button>
        </React.Fragment>
      );
    }
    return (
      <div
        className={`dropdown ${me.role.level < user.role.level &&
          'is-hoverable'}`}
      >
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            disabled={me.role.level >= user.role.level}
          >
            <span>Action</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <button
              className="dropdown-item"
              onClick={() => {
                setEmailToResetPassword(user.email);
              }}
            >
              Reset Password
            </button>
            {user.isActive ? (
              <button
                className="dropdown-item"
                onClick={() => {
                  openSuspendUserModal(user.email, 'suspend');
                }}
              >
                Suspend
              </button>
            ) : (
              <button
                className="dropdown-item"
                onClick={() => {
                  openSuspendUserModal(user.email, 'activate');
                }}
              >
                Activate
              </button>
            )}
            <button
              className="dropdown-item"
              onClick={() => {
                this.toggleEditMode(true);
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { me, roles } = this.props;
    let { user, editMode, currentRole } = this.state;

    let roleOptions = roles
      .filter(role => role.level >= me.role.level)
      .map(role => ({ label: role.name, value: role._id }));

    const isManagerRoleAndAbove = me.role.level <= 3;

    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          {editMode ? (
            <Select
              className="dropDownSelect"
              options={roleOptions}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={currentRole}
              isDisabled={false}
            />
          ) : (
            user.role.name
          )}
        </td>
        <td>
          {user.isActive ? (
            <span className="tag is-primary">Active</span>
          ) : (
            <span className="tag is-danger">Suspended</span>
          )}
        </td>
        <td>{user.name}</td>
        {isManagerRoleAndAbove && <td> {this.renderActionButton()} </td>}
      </tr>
    );
  }
}

TableUsersRow.propTypes = {
  user: PropTypes.any,
  me: PropTypes.any,
  setEmailToResetPassword: PropTypes.func,
  openSuspendUserModal: PropTypes.func,
  roles: PropTypes.any,
  updateUserRole: PropTypes.func,
};

export default TableUsersRow;
