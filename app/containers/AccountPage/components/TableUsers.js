import React from 'react';
import PropTypes from 'prop-types';
import TableUsersRow from './TableUsersRow';

const TableUsers = props => {
  const { users } = props;

  const renderUserRows = () => {
    let { toggleSuspendModal, setUserToSuspend, currentUser } = props;

    return users.map((user, key) => (
      <TableUsersRow
        key={key}
        user={user}
        currentUser={currentUser}
        toggleSuspendModal={toggleSuspendModal}
        setUserToSuspend={setUserToSuspend}
      />
    ));
  };

  return (
    <table className="table is-fullwidth table-container is-hoverable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Email</th>
          <th>API Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{renderUserRows(users)}</tbody>
    </table>
  );
};

TableUsers.propTypes = {
  users: PropTypes.any,
  toggleSuspendModal: PropTypes.func,
  setUserToSuspend: PropTypes.func,
  currentUser: PropTypes.any,
};

export default TableUsers;
