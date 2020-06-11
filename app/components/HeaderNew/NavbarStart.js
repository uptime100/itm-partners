import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import NavbarItemSpan from './NavbarItemSpan';
import NavbarItem from './NavbarItem';
import NavbarImageIcon from './NavbarImageIcon';

class NavbarStart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
    };
  }

  onHoverNavItem = path => {
    let page = path.slice(1);
    if (page === `account/${this.props.currentUser.partner._id}`) {
      page = 'account';
      this.setState({ page });
    } else {
      this.setState({ page });
    }
  };

  render() {
    let { page } = this.state;

    let accountsLink;
    try {
      accountsLink = `/account/${this.props.currentUser.partner._id}`;
    } catch (e) {}

    if (!this.props.currentUser) {
      return null;
    }

    return (
      <div className={`${this.props.className} navbar-start`}>
        <NavbarItem
          onHoverNavItem={this.onHoverNavItem}
          isActive={
            this.props.pathname === '/transactions' ||
            this.props.pathname === '/'
          }
          to="/transactions"
        >
          <NavbarImageIcon
            page={page === 'transactions'}
            name="transactions"
            isActive={
              this.props.pathname === '/transactions' ||
              this.props.pathname === '/'
            }
          />
          <NavbarItemSpan
            color="#fff"
            isActive={
              this.props.pathname === '/transactions' ||
              this.props.pathname === '/'
            }
          >
            Transactions
            {/* {transactionActive} */}
          </NavbarItemSpan>
        </NavbarItem>

        <NavbarItem
          page={page === 'account'}
          onHoverNavItem={this.onHoverNavItem}
          isActive={this.props.pathname.indexOf('/account') === 0}
          to={accountsLink}
        >
          <NavbarImageIcon
            page={page === 'account'}
            name="account"
            isActive={this.props.pathname.indexOf('/account') === 0}
          />
          <NavbarItemSpan color="#fff">Account</NavbarItemSpan>
        </NavbarItem>

        <NavbarItem
          onHoverNavItem={this.onHoverNavItem}
          isActive={this.props.pathname === '/plugins'}
          to="/plugins"
        >
          <NavbarImageIcon
            page={page === 'plugins'}
            name="plugin"
            isActive={this.props.pathname === '/plugins'}
          />
          <NavbarItemSpan color="#fff">Plugin</NavbarItemSpan>
        </NavbarItem>

        <NavbarItem
          onHoverNavItem={this.onHoverNavItem}
          isActive={this.props.pathname === '/partners'}
          to="/partners"
        >
          <NavbarImageIcon
            page={page === 'partners'}
            name="directory"
            isActive={this.props.pathname === '/partners'}
          />
          <NavbarItemSpan color="#fff">Directory</NavbarItemSpan>
        </NavbarItem>
      </div>
    );
  }
}

// const NavbarStart = props => {
//   let accountsLink;
//   try {
//     accountsLink = `/account/${props.currentUser.partner._id}`;
//   } catch (e) {}

//   let hoverImageStatus;

//   function onHoverNavItem(props) {
//     console.log(props)
//   }

//   return (
//     <div className={`${props.className} navbar-start`}>
//       <NavbarItem
//         onHoverNavItem={onHoverNavItem}
//         isActive={props.pathname === '/transactions' || props.pathname === '/'}
//         to="/transactions"
//       >
//         <NavbarImageIcon
//           name="transactions"
//           isActive={
//             props.pathname === '/transactions' || props.pathname === '/'
//           }
//         />
//         <NavbarItemSpan
//           color="#fff"
//           isActive={
//             props.pathname === '/transactions' || props.pathname === '/'
//           }
//         >
//           Transactions
//         </NavbarItemSpan>
//       </NavbarItem>
//       {/* <NavbarItem isActive={props.pathname === '/marketing'} to="/marketing">
//         <NavbarImageIcon name="marketing" />
//         <NavbarItemSpan color="#fff">Marketing</NavbarItemSpan>
//       </NavbarItem> */}
//       <NavbarItem
//         onHoverNavItem={onHoverNavItem}
//         isActive={props.pathname.indexOf('/account') === 0}
//         to={accountsLink}
//       >
//         <NavbarImageIcon
//           name="account"
//           isActive={props.pathname.indexOf('/account') === 0}
//         />
//         <NavbarItemSpan color="#fff">Account</NavbarItemSpan>
//       </NavbarItem>
//       <NavbarItem onHoverNavItem={onHoverNavItem} isActive={props.pathname === '/plugins'} to="/plugins">
//         <NavbarImageIcon
//           name="plugin"
//           isActive={props.pathname === '/plugins'}
//         />
//         <NavbarItemSpan color="#fff">Plugin</NavbarItemSpan>
//       </NavbarItem>
//       <NavbarItem onHoverNavItem={onHoverNavItem} isActive={props.pathname === '/partners'} to="/partners">
//         <NavbarImageIcon
//           name="directory"
//           isActive={props.pathname === '/partners'}
//         />
//         <NavbarItemSpan color="#fff">Directory</NavbarItemSpan>
//       </NavbarItem>
//     </div>
//   );
// };

NavbarStart.propTypes = {
  className: PropTypes.string,
  currentUser: PropTypes.object,
  pathname: PropTypes.string,
};

export default styled(NavbarStart)`
  @media screen and (min-width: 1280px) {
    margin-left: 34px;
  }
  @media screen and (min-width: 1472px) {
    margin-left: 68px;
  }
`;
