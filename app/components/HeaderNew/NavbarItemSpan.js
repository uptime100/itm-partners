import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const span = props => (
  <span className={`${props.className}`}>{props.children}</span>
);

span.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const NavbarItemSpan = styled(span)`
  && {
    color: #62b5e5;
    font-size: 1.1rem;

    @media screen and (min-width: 1088px) and (max-width: 1471px) {
      font-size: 0.8rem;
    }
  }
`;

export default NavbarItemSpan;
