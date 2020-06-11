import React from 'react';

import NavbarMenu from './NavbarMenu';
import FooterNav from './FooterNav';
import PropTypes from 'prop-types';
import version from '../../_git_commit';

const Footer = props => (
  <FooterNav>
    <div className="container">
      <NavbarMenu>
        <div className="footer-navbar-start">
          <a href="https://intimate.io" className="footer-navbar-item">
            &copy; intimate.io - {version.logMessage}
          </a>
          <button
            href="#"
            className="footer-navbar-item hidden-sm"
            onClick={props.toggleDisclaimerModal}
          >
            Disclaimer
          </button>
          <a
            href="https://intimate.io/privacy-policy"
            className="footer-navbar-item hidden-sm"
          >
            Privacy Policy
          </a>
          <a
            href="https://intimate.io/terms-of-use"
            className="footer-navbar-item hidden-sm"
          >
            Terms of Use
          </a>
          <a
            href="https://intimate.io/cookie-policy"
            className="footer-navbar-item hidden-sm"
          >
            Cookie Policy
          </a>
          <a
            href="mailto:support@intimate.io"
            className="footer-navbar-item hidden-sm"
          >
            Contact Us
          </a>
        </div>
      </NavbarMenu>
    </div>
  </FooterNav>
);

Footer.propTypes = {
  toggleDisclaimerModal: PropTypes.func,
};

export default Footer;
