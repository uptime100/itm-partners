import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Config from 'utils/getEnvConfig';
import injectReducer from 'utils/injectReducer';

import { removeToken } from 'utils/token';

import Navbar from './Navbar';
import NavbarStart from './NavbarStart';
import NavbarEnd from './NavbarEnd';
import { setTokenDetails } from '../../containers/Callback/actions';
import { makeSelectTokenDetails } from '../../containers/Callback/selectors';
import reducer from '../../containers/Callback/reducer';

import brand from '../../images/intimate_logo2019/intimate-io-horizontal_white.svg';

class Header extends PureComponent {
  logout = () => {
    // TODO: MOVE TO utils/token
    removeToken();
    this.props.setTokenDetails(null);
    window.location.href = `${
      Config.API_URL
    }/oauth/authorise?client_id=partners&grant_type=implicit`;
  };

  render() {
    const { isActive, toggle } = this.props;

    return (
      <Navbar>
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src={brand} alt="Intimate IO" width="150" height="auto" />
            </a>

            <button
              className={`navbar-burger ${isActive && 'is-active'}`}
              aria-label="menu"
              aria-expanded="false"
              onClick={toggle}
              tabIndex={0}
              onKeyUp={() => {}}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>

          <div
            className={`navbar-menu ${isActive && 'is-active'}`}
            onClick={this.toggle}
            role="button"
          >
            <NavbarStart
              currentUser={this.props.currentUser}
              pathname={this.props.location.pathname}
            />
            <NavbarEnd
              logout={this.logout}
              currentUser={this.props.currentUser}
              pathname={this.props.location.pathname}
            />
          </div>
        </div>
      </Navbar>
    );
  }
}

Header.propTypes = {
  setTokenDetails: PropTypes.func,
  currentUser: PropTypes.object,
  location: PropTypes.object,
  isActive: PropTypes.bool,
  toggle: PropTypes.func,
};

const withReducer = injectReducer({ key: 'tokenDetails', reducer });

function mapDispatchToProps(dispatch) {
  return {
    setTokenDetails: tokenDetails => dispatch(setTokenDetails(tokenDetails)),
  };
}

const mapStateToProps = createStructuredSelector({
  tokenDetails: makeSelectTokenDetails(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withRouter,
  withConnect,
)(Header);
