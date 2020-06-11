import React from 'react';

import NavbarItemSpan from './NavbarItemSpan';
import NavbarItem from './NavbarItem';
import NavbarImageIcon from './NavbarImageIcon';
import NavbarEndInfo from './NavbarEndInfo';

class NavbarEnd extends React.Component {
  render() {
    let props = this.props;
    let logout = (
      <NavbarEndInfo currentUser={props.currentUser} logout={props.logout} />
    );
    if (!props.currentUser) {
      logout = null;
    }
    return (
      <div className="navbar-end">
        <NavbarItem
          isActive={false}
          to="/help"
          isActive={props.pathname === '/help'}
        >
          <NavbarImageIcon name="help" />
          <NavbarItemSpan color="#fff">Help</NavbarItemSpan>
        </NavbarItem>
        {logout}
      </div>
    );
  }
}

export default NavbarEnd;
