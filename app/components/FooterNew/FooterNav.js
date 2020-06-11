import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const navbar = props => (
  <nav className={`${props.className} navbar is-fixed-bottom`}>
    {props.children}
  </nav>
);

navbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const FooterNav = styled(navbar)`
  && {
    min-height: 50px;
    height: 50px;
    background: #365e9d;

    @media screen and (max-width: 1087px) {
      display: none;
    }
  }
`;

export default FooterNav;
