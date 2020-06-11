import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NavbarEndInfo = props => (
  <div className={`${props.className} navbar-item`}>
    {/* <p className="white">{itmBalance} ITM</p> */}
    <p className="white" />
    <button className="logout white is-text button" onClick={props.logout}>
      Logout
    </button>
  </div>
);

NavbarEndInfo.propTypes = {
  className: PropTypes.string,
  logout: PropTypes.func,
};

export default styled(NavbarEndInfo)`
  && {
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    font-size: 1.1rem;

    .white {
      color: #fff;
    }

    .balance {
      color: #99cc00;
    }

    .logout {
      margin-top: 4px;
      font-size: 1.2rem;
    }

    @media screen and (min-width: 1088px) {
      && {
        font-size: 0.9rem;

        .logout {
          font-size: 1rem;
        }
      }
    }
  }
`;
