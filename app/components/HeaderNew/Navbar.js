import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const navbar = props => (
  <nav
    className={`navbar ${props.className} is-fixed-top`}
    aria-label="main navigation"
  >
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

const Navbar = styled(navbar)`
  && {
    background: #365e9d;
    @media screen and (min-width: 1088px) {
      height: 100px;
    }
  }
`;

export default Navbar;
