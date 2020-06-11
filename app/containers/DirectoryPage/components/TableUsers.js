import React from 'react';
import PropTypes from 'prop-types';
import TableUsersRow from './TableUsersRow';

const TableUsers = props => {
  const {
    users,
    me,
    setEmailToResetPassword,
    openSuspendUserModal,
    roles,
    updateUserRole,
  } = props;

  const isManagerRoleAndAbove = me.role.level <= 3;

  return (
    <table className="table is-fullwidth table-container is-hoverable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Last Login</th>
          {isManagerRoleAndAbove && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {users.map((user, key) => (
          <TableUsersRow
            key={key}
            roles={roles}
            me={me}
            user={user}
            setEmailToResetPassword={setEmailToResetPassword}
            openSuspendUserModal={openSuspendUserModal}
            updateUserRole={updateUserRole}
          />
        ))}
      </tbody>
    </table>
  );
};

TableUsers.propTypes = {
  users: PropTypes.any,
  me: PropTypes.any,
  roles: PropTypes.any,
  setEmailToResetPassword: PropTypes.func,
  openSuspendUserModal: PropTypes.func,
  updateUserRole: PropTypes.func,
};

export default TableUsers;
