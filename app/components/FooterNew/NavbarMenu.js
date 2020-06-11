import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const footerNavbar = props => (
  <div className={`${props.className}`}>{props.children}</div>
);

footerNavbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const NavbarMenu = styled(footerNavbar)`
  && {
    .footer-navbar-start .footer-navbar-item {
      color: #fff;
      padding-left: 4px;
      padding-right: 0;
      line-height: 50px;
    }

    .footer-navbar-start .footer-navbar-item:hover {
      background: #365e9d;
      color: #62b5e5;
    }

    .footer-navbar-start .footer-navbar-item::after {
      content: '|';
      margin-left: 4px;
      color: #fff;
    }

    .footer-navbar-start .footer-navbar-item:last-child::after {
      content: none;
    }

    @media screen and (max-width: 1087px) {
      .footer-navbar-start {
        padding-left: 12px;
      }
      .footer-navbar-start .footer-navbar-item:first-child::after {
        content: none;
      }

      .hidden-sm {
        display: none;
      }
    }
  }
`;

export default NavbarMenu;
