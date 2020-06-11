import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const A = props =>
  props.to ? (
    <Link
      className={`${props.className} ${
        props.isActive ? 'is-active' : null
      } navbar-item`}
      to={props.to}
      href={props.to}
      onMouseEnter={() => {
        props.onHoverNavItem(props.to);
      }}
      onMouseLeave={() =>
        props.onHoverNavItem && props.onHoverNavItem('/content')
      }
    >
      {props.children}
    </Link>
  ) : (
    <span
      className={`${props.className} ${
        props.isActive ? 'is-active' : null
      } navbar-item`}
    >
      {props.children}
    </span>
  );

A.propTypes = {
  isActive: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  to: PropTypes.string,
  onHoverNavItem: PropTypes.func,
};

const navHighlight = props =>
  props.isActive ? '5px solid white' : '5px solid #365e9d';

const NavbarItem = styled(A)`
  && {
    line-height: 34px;

    span,
    .icon {
      color: #365e9d;
    }

    @media screen and (min-width: 1088px) {
      && {
        border-bottom: ${navHighlight};
        line-height: unset;
        padding: 4px;
        min-width: 64px;

        flex-direction: column;
        justify-content: center;
        align-items: center;

        :hover {
          background: #365e9d;
          border-bottom: 5px solid white;
        }

        :hover span,
        :hover .icon {
          color: #fff;
        }
        span,
        .icon {
          color: ${props => (props.isActive ? '#fff' : '#62B5E5')};
        }
      }
    }

    @media screen and (min-width: 1280px) {
      && {
        min-width: 83px;
      }
    }

    @media screen and (min-width: 1472px) {
      && {
        min-width: 102px;
      }
    }
  }
`;

export default NavbarItem;
